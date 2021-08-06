// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// CSS definition
import './main.postcss'

// Normal imports
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import mixin from './mixin'
import { webp } from './plugins/webp'

// External plugins
import { createI18n } from 'vue-i18n'

// Components & Widgets
import Setup from '@/components/setup.vue'
import Exps from '@/components/setup/exps.vue'
import Investigators from '@/components/setup/investigators.vue'
import translations from '@/jsons/translation.json'


/* ========================================================================== *
* i18n Begins                                                                 *
* -------------------------------------------------------------------------- */
const i18n = createI18n({
  locale: 'zh',
  messages: translations,
})


/* ========================================================================== *
 * Create App                                                                 *
 * -------------------------------------------------------------------------- */
const app = createApp(App)
    .use(router)
    .use(i18n)
    .use(mixin)
    .use(webp)
    .component('setup', Setup)
    .component('investigators', Investigators)
    .component('exps', Exps)

router.isReady()
    .then(() => {
      console.log('ROUTER READY, MOUNTING APP')
      app.mount('#app')
    })
    .catch((error) => {
      console.error('ERROR STARTING VUE', error)
    })
