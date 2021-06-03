require('source-map-support').install()

import { blacklistInterceptor } from './lib/blacklist'
import { cacheRequestInterceptor, cacheResponseInterceptor } from './lib/request-cache'
import { createClient } from 'contentful'
import { createLocalServer } from './lib/local-server'
import { logger } from './lib/logger'
import { ParallelExecutor } from './lib/parallel-executor'
import { Product } from '@juitnow/lib-schema-types'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { waitForNetworkIdle } from './lib/network-idle'

import fetch from 'node-fetch'
import puppeteer, { HTTPRequest } from 'puppeteer'
import yargs from 'yargs'

import { M, W, K, X } from './lib/colors'

const WRAP_OFF = '\u001b[?7l' // do not wrap text
const WRAP_ON = '\u001b[?7h' // restore text wrapping (normal behavior)

// Our general logger
const renderLog = logger('renderer')

// The director where all our static content has been generated
const baseDir = resolve(__dirname, '..', '..', 'dist')

// The base URL of our prerendering world
const baseUrl = new URL('/', 'https://localhost/').toString()

// Basics (logging)
renderLog.info('Pre-rendering pages')
renderLog.info(`  baseDir = ${baseDir}`)
renderLog.info(`  baseUrl = ${baseUrl}`)
renderLog.info()

/* ========================================================================== */

async function getPageSlugs(): Promise<string[]> {
  const contentful = createClient({
    host: 'preview.contentful.com',
    space: 'a4btwfkreom2',
    accessToken: 'R-_BmYXB9-khEDHaHHv06V1vVayCkxaYgsDUegZ9P1s',
    environment: 'newdev',
  })

  const entries = await contentful.getEntries({
    content_type: 'page',
    include: 0,
  })

  const slugs = entries.items.map((item) => {
    return (<any> item?.fields).slug
  }).filter((slug) => {
    return slug && (typeof slug === 'string')
  })
  renderLog.info('Found', slugs.length, 'page slugs to render')
  return slugs
}

async function getProductSlugs(): Promise<string[]> {
  const response = await fetch('https://devapi.juitnow.com/products/v1')
  const products: Product[] = await response.json()
  const slugs = products.map((product) => `dishes/${product.external_ids.contentful_slug}`)
  renderLog.info('Found', slugs.length, 'product slugs to render')
  return slugs
}

/* ========================================================================== */

async function main(enableConsole: boolean): Promise<boolean> {
  // Prepare a combined request interceptor for all pages
  const localServerInterceptor = await createLocalServer(baseDir, baseUrl)

  const interceptors = [
    cacheRequestInterceptor, // serve requests from cache first
    localServerInterceptor, // local server pages after cache
    blacklistInterceptor, // last one is to blacklist anything we don't want
  ]

  async function combinedRequestInterceptor(request: HTTPRequest) {
    try {
      for (const interceptor of interceptors) {
        if (await interceptor(request)) return
      }
    } catch (error) {
      renderLog.info('Error handling request', error)
      await request.abort('failed')
    }
  }

  // Figure out all the URLs we have to render
  const slugs = (await Promise.all([
    getPageSlugs(),
    getProductSlugs(),
  ])).flat()

  // TODO: What to do with "baseUrl" ? We redirect to /en or /de normally...
  const urls: URL[] = []
  for (const locale of [ 'en', 'de' ]) {
    urls.push(new URL(`/${locale}`, baseUrl))
    for (const slug of slugs) {
      urls.push(new URL(`/${locale}/${slug}`, baseUrl))
    }
  }

  urls.sort()

  // Ok, we can start now!
  const executor = new ParallelExecutor<boolean>(5)
  const browser = await puppeteer.launch()

  const start = Date.now()
  renderLog.info('Starting rendering of', urls.length, `pages [parallelism=${executor.parallelism}]`)
  renderLog.info()

  for (const url of urls) {
    const pageLog = logger(`renderer${K}] [${M}${url.pathname}`)
    executor.enqueue(async () => {
      const start = Date.now()
      pageLog.info('Starting page render')
      const page = await browser.newPage()
      try {
        await page.setCacheEnabled(true)
        await page.setRequestInterception(true)

        const idle = waitForNetworkIdle(page, 1000)

        page.on('request', combinedRequestInterceptor)
        page.on('response', cacheResponseInterceptor)

        let errors = 0
        page.on('error', (error) => {
          pageLog.error('Error rendering', error)
          errors ++
        })

        if (enableConsole) {
          page.on('console', (message) => {
            const args = message.args().map((handle) => handle.jsonValue())
            Promise.all(args).then((args) => {
              if (args.length === 0) args.push(message.text())

              const location = message.location().url
              const prefix = location ?
                `${K}[${W}console${K}]${X} ${WRAP_OFF}${location}${WRAP_ON}\n` :
                `${K}[${W}console${K}]${X} (no location)\n`

              switch (message.type()) {
                case 'error':
                  return pageLog.error(prefix, ...args)
                case 'warning':
                  return pageLog.warn(prefix, ...args)
                case 'dir':
                case 'info':
                case 'log':
                  return pageLog.info(prefix, ...args)
                case 'debug':
                default:
                  return pageLog.debug(prefix, ...args)
              }
            }).catch((error) => pageLog.error('Error in console', error))
          })
        }

        // Load up our initial URL
        await page.goto(url.toString())

        // Give it 10 seconds to finish up fetching/rendering...
        await idle

        // How to end...
        if (errors) {
          pageLog.error('Found', errors, 'errors while rendering')
          return false
        } else if (page.url() != url.toString()) {
          pageLog.error('Redirected to', page.url())
          return false
        } else {
          const output = await page.content()
          const outputDir = resolve(baseDir, `.${url.pathname}`)
          const outputFile = resolve(outputDir, 'index.html')

          pageLog.debug('Writing page to', outputFile)
          await fs.mkdir(outputDir, { recursive: true })
          await fs.writeFile(outputFile, output, 'utf-8')

          pageLog.info('Page rendered in', Date.now() - start, 'ms')
          return true
        }
      } catch (error) {
        pageLog.error('Error while rendering', error)
        return false
      } finally {
        await page.close()
      }
    })
  }

  const results = await executor.await()
  const errors = results.reduce((count, success) => count + (success ? 0 : 1), 0)
  await browser.close()

  /* ======================================================================== */

  if (errors) {
    renderLog.error()
    renderLog.error('Found', errors, 'errors while rendering')
    return false
  } else {
    const seconds = Math.floor((Date.now() - start) / 1000)
    renderLog.info()
    renderLog.info('Successfully rendered', results.length, 'pages in', seconds, 'sec')
    return true
  }
}

/* ========================================================================== */

const { console: enableConsole } = yargs
    .usage('$0 [--enable-console]')
    .help('h').alias('h', 'help')
    .option('console', {
      alias: [ 'enable-console', 'c' ],
      type: 'boolean',
      description: 'Enable browser console',
      default: false,
    })
    .strict()
    .argv

main(enableConsole)
    .then((success) => {
      process.exitCode = success ? 0 : 1
    })
    .catch((error) => {
      renderLog.error()
      renderLog.error('Error rendering', error)
      process.exitCode = 2
    })
