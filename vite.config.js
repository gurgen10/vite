import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import vue from '@vitejs/plugin-vue'

const virtualFile = '@virtual-file'
const virtualId = '\0' + virtualFile
const nestedVirtualFile = '@nested-virtual-file'
const nestedVirtualId = '\0' + nestedVirtualFile

console.log(virtualId, nestedVirtualId, "dddd");

globalThis.__vite_test_filename = __filename
globalThis.__vite_test_dirname = __dirname

export default defineConfig(({ command, ssrBuild }) =>({
  server: {
    host: true,
  },
  plugins: [
    vue(),
    Pages(),
    {
      name: 'virtual',
      resolveId(id) {
        if (id === 'header') {
          return id
        }
      },
      load(id, options) {
        const ssrFromOptions = options?.ssr ?? false
        console.log(id, 8888888888888888);
        if (id === 'header') {
          // Force a mismatch error if ssrBuild is different from ssrFromOptions
          return `export default { msg: '${
            command === 'build' && !!ssrBuild !== ssrFromOptions
              ? `defineConfig ssrBuild !== ssr from load options`
              : 'hi'
          }' }`
        }
      }
    },
    {
      name: 'virtual-module',
      resolveId(id) {
        if (id === virtualFile) {
          return virtualId
        } else if (id === nestedVirtualFile) {
          return nestedVirtualId
        }
      },
      load(id) {
        if (id === virtualId) {
          return `export { msg } from "@nested-virtual-file";`
        } else if (id === nestedVirtualId) {
          return `export const msg = "[success] from conventional virtual file"`
        }
      }
    },
    // Example of a plugin that injects a helper from a virtual module that can
    // be used in renderBuiltUrl
    // (function () {
    //   const queryRE = /\?.*$/s
    //   const hashRE = /#.*$/s
    //   const cleanUrl = (url) => url.replace(hashRE, '').replace(queryRE, '')
    //   let config

    //   const virtualId = '\0virtual:ssr-vue-built-url'
    //   return {
    //     name: 'built-url',
    //     enforce: 'post',
    //     configResolved(_config) {
    //       config = _config
    //     },
    //     resolveId(id) {
    //       if (id === virtualId) {
    //         return id
    //       }
    //     },
    //     load(id) {
    //       if (id === virtualId) {
    //         return {
    //           code: `export const __ssr_vue_processAssetPath = (url) => '${base}' + url`,
    //           moduleSideEffects: 'no-treeshake'
    //         }
    //       }
    //     },
    //     transform(code, id) {
    //       if (
    //         config.build.ssr &&
    //         cleanUrl(id).endsWith('.js') &&
    //         !code.includes('__ssr_vue_processAssetPath')
    //       ) {
    //         return {
    //           code:
    //             `import { __ssr_vue_processAssetPath } from '${virtualId}';` +
    //             code,
    //           sourcemap: null // no sourcemap support to speed up CI
    //         }
    //       }
    //     }
    //   }
    // })()
  ],
  // experimental: {
  //   renderBuiltUrl(filename, { hostType, type, ssr }) {
  //     if (ssr && type === 'asset' && hostType === 'js') {
  //       return {
  //         runtime: `__ssr_vue_processAssetPath(${JSON.stringify(filename)})`
  //       }
  //     }
  //   }
  // },
  // build: {
  //   minify: false
  // },
  // ssr: {
  //   noExternal: [
  //     // this package has uncompiled .vue files
  //     'example-external-component'
  //   ]
  // },
  // optimizeDeps: {
  //   exclude: ['example-external-component']
  // }
}))
