import env from '@/env'
import { createI18n } from 'vue-i18n'

function getBrowserLocale() {
  const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language
  if (!navigatorLocale) return ''
  return navigatorLocale.trim().split(/-|_/)[0]
}

const browserLocale = getBrowserLocale()
const fallbackLocale = env.VUE_APP_LOCALE || 'en'
const availableLocales = (env.VUE_APP_AVAILABLE_LOCALES || fallbackLocale).split(',')
const locale = availableLocales.indexOf(browserLocale) >= 0 ? browserLocale : fallbackLocale

const i18n = createI18n({
  locale,
  messages: availableLocales.reduce((m, l) => Object.assign(m, { [l]: {} }), {}),
  fallbackLocale,
  availableLocales,
  silentTranslationWarn: true,
})

export default i18n
