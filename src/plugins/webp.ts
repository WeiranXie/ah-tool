import { App } from 'vue'
import { detect } from 'detect-browser'
const browser = detect()
const webp_support = browser === null ? false : ![ 'safari', 'ie', 'ios', 'ios-webview', 'edge-ios', 'fxios' ].includes(browser.name) && browser.os !== 'Linux' && browser.os !== 'iOS'
if (browser !== null) console.log(browser.name, browser.version, 'on', browser.os)

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $imgPngFm: string;
    $imgJpgFm: string;
  }
}

export const webp = {
  install(app: App): void {
    app.config.globalProperties.$imgPngFm = webp_support ? 'webp' : 'png'
    app.config.globalProperties.$imgJpgFm = webp_support ? 'webp' : 'jpg'
  },
}
