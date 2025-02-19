import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { ru } from 'vuetify/locale'

const vuetify = createVuetify({
  components,
  directives,
  ...{
    locale: {
      locale: 'ru',
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#4272cf',
            secondary: '#603333',
            accent: '#58B873',
            error: '#FFD5D6'
          }
        }
      }
    }
  }
})

export default vuetify
