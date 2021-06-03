import { HTTPRequest, HTTPResponse, ResponseForRequest } from 'puppeteer'

import { logger } from './logger'
const log = logger('request-cache')

const cache = new Map<string, Partial<ResponseForRequest>>()

export async function cacheRequestInterceptor(request: HTTPRequest): Promise<boolean> {
  const url = request.url()
  const type = request.resourceType()
  const method = request.method()

  const response = cache.get(`${method}|${url}`)
  if (! response) return false

  log.debug(`Returning cached response for ${method} ${url} [type=${type}]`)
  await request.respond(response)
  return true
}

export function cacheResponseInterceptor(response: HTTPResponse): void {
  const request = response.request()

  const url = request.url()
  const method = request.method()

  const key = `${method}|${url}`
  if (cache.has(key)) return

  const type = request.resourceType()
  const status = response.status()
  const headers = response.headers()

  if (url.match(/^https?:\/\//) &&
    ((method === 'GET') || (method === 'OPTIONS')) &&
    (status >= 200) && (status < 300)) {
    if (status === 204) {
      log.debug(`Caching response for ${method} ${url} [type=${type}]`)
      cache.set(key, { status, headers })
    } else {
      response.buffer().then((body) => {
        log.debug(`Caching response for ${method} ${url} [type=${type}]`)
        cache.set(key, { status, headers, body })
      }).catch((error) => {
        log.debug(`Error response for ${method} ${url} [type=${type}]`, error)
      })
    }
  } else {
    log.debug(`Not caching response for ${method} ${url} [type=${type},status=${status}]`)
  }
}
