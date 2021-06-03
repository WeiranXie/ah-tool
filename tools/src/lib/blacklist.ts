import { HTTPRequest } from 'puppeteer'

import { logger } from './logger'
const log = logger('blacklist')

export async function blacklistInterceptor(request: HTTPRequest): Promise<boolean> {
  const type = request.resourceType()
  const url = request.url()

  // Anything non HTTP/HTTPS (data url?) is not handled here...
  if (!url.match(/^https?:\/\//)) return false

  // Images can go the way of the dodo...
  if (type === 'image') {
    await request.abort()
    return true
  }

  // Anything else can be served locally or remotely...
  const hostname = new URL(url).hostname
  if (hostname.match(/\.(contentful\.com|ctfassets\.net|juit\.com|juitnow\.com)$/)) {
    log.debug(`Allowing request for ${url} to continue [type=${type}]`)
    await request.continue()
  } else {
    log.debug(`Blocking request for ${url} [type=${type}]`)
    await request.abort()
  }

  // We always call "continue()" or "abort()"
  return true
}
