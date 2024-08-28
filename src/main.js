import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faDownload, faPlus, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faDownload, faSun, faMoon)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
