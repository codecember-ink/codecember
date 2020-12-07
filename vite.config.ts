import path from 'path'
import { UserConfig } from 'vite'
import Voie from 'vite-plugin-voie'
import PurgeIcons from 'vite-plugin-purge-icons'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'
import Shiki from 'markdown-it-shiki'

const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}

const config: UserConfig = {
  alias,
  plugins: [
    Voie({
      importMode: 'sync',
      extensions: ['vue', 'md'],
    }),
    Markdown({
      wrapperComponent: 'day-wrapper',
      markdownItSetup(md) {
        md.use(Shiki, { theme: { dark: 'nord', light: 'min-light' } })
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
