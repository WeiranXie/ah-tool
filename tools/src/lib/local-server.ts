import path from 'path'
import { lookup } from 'mime-types'
import { promises as fs } from 'fs'
import { HTTPRequest, ResponseForRequest } from 'puppeteer'

import { logger } from './logger'
const log = logger('local-server')

function makeResponse(path: string, body: Buffer): Partial<ResponseForRequest> {
  const contentType = lookup(path) || undefined
  const headers = { 'content-type': contentType, 'content-length': body.length }
  const response = { status: 200, contentType, headers, body }
  return response
}

export async function createLocalServer(baseDir: string, baseUrl: string) {
  // Resolve a relative path name into a full one
  function resolve(relative: string) {
    return path.normalize(path.join(baseDir, relative))
  }

  // Get and cache our index
  const index = resolve('/index.html')
  const indexResponse = makeResponse(index, await fs.readFile(index))

  return async function serveLocally(request: HTTPRequest): Promise<boolean> {
    const url = request.url()

    // The "baseURL is special"
    if (url === baseUrl) {
      log.debug(`Returning index file for ${url} [type=${request.resourceType()},mime=${indexResponse.contentType}]`)
      await request.respond(indexResponse)
      return true
    }

    // Check that the URL corresponds to our base URL
    if (! url.startsWith(baseUrl)) return false
    const path = new URL(url).pathname
    const file = resolve(path)

    // Check if the file exists locally... If so
    try {
      const stat = await fs.stat(file)
      const response = stat.isDirectory() ?
        makeResponse(file, await fs.readFile(file + '/index.html')) :
        makeResponse(file, await fs.readFile(file))
      log.debug(`Serving local file "${path}" for ${url} [type=${request.resourceType()},mime=${response.contentType}]`)
      await request.respond(response)
      return true
    } catch (error) {
      if (error.code === 'ENOENT') {
        log.debug(`Returning index file for ${url} [type=${request.resourceType()},mime=${indexResponse.contentType}]`)
        await request.respond(indexResponse)
        return true
      } else {
        throw error
      }
    }
  }
}
