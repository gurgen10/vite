import { createSSRApp } from 'vue'
// import i18n from './i18n';
import './style.css'
import App from './App.vue'

import { createI18n } from 'vue-i18n'
import { createRouter } from './router'

import en from './locales/en.json'
import am from './locales/am.json'


const router = createRouter()



const i18n = createI18n({
  locale: 'en',
  messages: {
    en, am
  }
})


// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)
  app.use(i18n)
  return { app, router }
}
