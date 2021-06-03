// Rework of @agabhane/puppeteer-pending-requests 1.0.1 (MIT-licensed)

import { Page, HTTPRequest } from 'puppeteer'

export class PuppeteerPendingRequests {
  private _requests = new Set<HTTPRequest>();
  private _page: Page;
  private _timeout: number;
  private _callback: () => void;
  private _timer?: NodeJS.Timeout;

  private constructor(page: Page, timeout: number, callback: () => void) {
    this._page = page
    this._timeout = timeout
    this._callback = callback

    // Setup our request listeners
    this._onRequest = this._onRequest.bind(this)
    this._onRequestFailed = this._onRequestFailed.bind(this)
    this._onRequestFinished = this._onRequestFinished.bind(this)

    this._page.on('request', this._onRequest)
    this._page.on('requestfailed', this._onRequestFailed)
    this._page.on('requestfinished', this._onRequestFinished)

    // Start our main timer loop
    this._setTimer()
  }

  private _onRequest(request: HTTPRequest) {
    this._requests.add(request)
  }

  private _onRequestFailed(request: HTTPRequest) {
    this._requests.delete(request)
    if (this._requests.size === 0) {
      this._setTimer()
    }
  }

  private _onRequestFinished(request: HTTPRequest) {
    this._requests.delete(request)
    if (this._requests.size === 0) {
      this._setTimer()
    }
  }

  private _setTimer() {
    if (this._timer) clearTimeout(this._timer)
    this._timer = setTimeout(() => {
      if (this._requests.size === 0) {
        this._page.off('request', this._onRequest)
        this._page.off('requestfailed', this._onRequestFailed)
        this._page.off('requestfinished', this._onRequestFinished)
        this._callback()
      }
    }, this._timeout)
  }

  static waitForNetworkIdle(page: Page, timeout: number): Promise<void> {
    return new Promise<void>((resolve) => {
      new PuppeteerPendingRequests(page, timeout, resolve)
    })
  }
}

export const waitForNetworkIdle = PuppeteerPendingRequests.waitForNetworkIdle.bind(null)
