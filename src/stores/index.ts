import { createPinia } from 'pinia'
import api from '@api'


const store = createPinia()

store.use(({ store }) => {
  store.$api = api
})

export default store
