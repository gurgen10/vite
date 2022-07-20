import { createApp } from 'vue'
// import i18n from './i18n';
import './style.css'
import App from './App.vue'

import { createI18n } from 'vue-i18n'
import { createRouter } from './router'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
// import messages from '@intlify/vite-plugin-vue-i18n/messages'
import en from './locales/en.json'
import am from './locales/am.json'


const router = createRouter()



console.log(router);

const i18n = createI18n({
  locale: 'en',
  messages: {
    en, am
  }
})

createApp(App).
use(i18n).
use(router).
mount('#app')
