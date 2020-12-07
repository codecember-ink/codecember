import path from 'path'
import { UserConfig } from 'vite'
import Voie from 'vite-plugin-voie'
import PurgeIcons from 'vite-plugin-purge-icons'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'
import { getHighlighter, Highlighter } from '@antfu/shiki'
import deasync from 'deasync'

const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}

let _highlighter: Highlighter = undefined!

getHighlighter({
  theme: 'nord',
  themes: ['nord', 'min-light'],
})
  .then((h) => {
    _highlighter = h
    console.log('!!resolved')
  })

const config: UserConfig = {
  alias,
  plugins: [
    Voie({
      // load index page sync and bundled with the landing page to improve first loading time.
      // feel free to remove if you don't need it
      importMode: 'sync',
      // (path: string) {
      //   if (['/src/pages/index.vue', '/src/pages/about.vue'].includes(path))
      //     return 'sync'

      //   return 'async'
      // },
      extensions: ['vue', 'md'],
    }),
    Markdown({
      wrapperComponent: 'day-wrapper',
      markdownItOptions: {
        highlight: (code, lang) => {
          // eslint-disable-next-line no-unmodified-loop-condition
          while (!_highlighter)
            deasync.sleep(100)

          const dark = _highlighter.codeToHtml(code, lang || 'text', 'nord')
          const light = _highlighter.codeToHtml(code, lang || 'text', 'min-light')
          return `<div class="shiki-dark">${dark}</div><div class="shiki-light">${light}</div>`
        },
      },
    }),
    ViteComponents({
      alias,
      dirs: [
        'src/components',
        'src/sketches',
      ],
      extensions: ['vue', 'md'],
      customLoaderMatcher: ({ path }) => path.endsWith('.md'),
    }),
    PurgeIcons(),
  ],
}

export default config
