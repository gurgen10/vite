import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import viteSSR from 'vite-ssr/plugin.js'
// import { resolve, dirname } from 'node:path'
// import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
// import { vueI18n } from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    viteSSR(),
    vue(),
    Pages({
      extensions: ['vue', 'md'],
    }),
    // vueI18n({
    //   // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
    //   // compositionOnly: false,

    //   // you need to set i18n resource including paths !
    //   include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
    // })
  ]
})
