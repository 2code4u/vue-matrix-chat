import './assets/base.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify.ts'
import store from './stores/index.ts'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vuetify)

app.mount('#app')
