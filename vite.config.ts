import path from 'path'
import { UserConfig } from 'vite'
import Voie from 'vite-plugin-voie'
import PurgeIcons from 'vite-plugin-purge-icons'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'

const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}

const config: UserConfig = {
  alias,
  plugins: [
    Voie({
      // load index page sync and bundled with the landing page to improve first loading time.
      // feel free to remove if you don't need it
      importMode(path: string) {
        if (['/src/pages/index.vue', '/src/pages/about.vue'].includes(path))
          return 'sync'

        return 'async'
      },
      extensions: ['vue', 'md'],
    }),
    Markdown({
      wrapperComponent: 'day-wrapper',
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
