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
import i18n from './i18n'

// Components & Widgets


/* ========================================================================== *
 * Create App                                                                 *
 * -------------------------------------------------------------------------- */
const app = createApp(App)
    .use(router)
    .use(i18n)
    .use(mixin)
    .use(webp)

router.isReady()
    .then(() => {
      console.log('ROUTER READY, MOUNTING APP')
      app.mount('#app')
    })
    .catch((error) => {
      console.error('ERROR STARTING VUE', error)
    })
