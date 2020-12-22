import './css/index.postcss'
import { ViteSSG } from 'vite-ssg'
// import routes generated by Voie
import routes from 'voie-pages'
// import icons data generated by PurgeIcons
import '@purge-icons/generated'

import App from './App.vue'

export const createApp = ViteSSG(
  App,
  { routes },
)
