import path from 'path'
import { UserConfig } from 'vite'
import Voie from 'vite-plugin-voie'
import PurgeIcons from 'vite-plugin-purge-icons'
import ViteComponents from 'vite-plugin-components'
import MD from 'markdown-it'
import { compileTemplate } from '@vue/compiler-sfc'

const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}

const md = new MD({
  html: true,
  linkify: true,
  typographer: true,
})

const config: UserConfig = {
  alias,
  plugins: [
    Voie({
      // load index page sync and bundled with the landing page to improve first loading time.
      // feel free to remove if you don't need it
      importMode(path: string) {
        if (path === '/src/pages/index.vue')
          return 'sync'
        return 'async'
      },
      extensions: ['vue', 'md'],
    }),
    ViteComponents({
      // currently, vite does not provide an API for plugins to get the config https://github.com/vitejs/vite/issues/738
      // as the `alias` changes the behavior of middlewares, you have to pass it to ViteComponents to do the resolving
      alias,
    }),
    PurgeIcons(),
  ],
  transforms: [
    {
      test({ path }) {
        return path.endsWith('.md')
      },
      transform({ code, isBuild, path }) {
        let { code: result } = compileTemplate({
          filename: path,
          id: path,
          source: md.render(code, {}),
          transformAssetUrls: false,
        })

        result = result.replace('export function render', 'function render')
        result += '\nconst __script = { render };'

        if (!isBuild)
          result += `\n__script.__hmrId = ${JSON.stringify(path)};`

        result += '\nexport default __script;'

        return result
      },
    },
  ],
}

export default config
