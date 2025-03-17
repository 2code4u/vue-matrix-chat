import { ref, type Ref } from 'vue'
import { getMatrixClient, TMatrixClient, type MatrixClient } from '@/utils/matrix'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

interface AdapterState {
  matrix: Ref<TMatrixClient | null>
  matrixAuthed: Ref<MatrixClient | null | undefined>
  syncReady: boolean
  homeServer: string
}

export const useAdapterStore = defineStore('adapter', {
  state: (): AdapterState => {
    return {
      matrix: ref(null),
      matrixAuthed: ref(null),
      syncReady: false,
      homeServer: ''
    };
  },

  getters: {
    chatClient: state => {
      return state.matrixAuthed
    },
  },

  actions: {
    resetState() {
      this.matrix = null
      this.matrixAuthed = null
      this.homeServer = ''
    },

    async connect(options: any) {
      const authStore = useAuthStore()

      this.matrix = await getMatrixClient(options)
      // authStore.authCheck()
    },

    async login(options: any) {
      if (this.matrix) {
        const data = await this.matrix.loginRequest({
          'providerURL': options.providerURL,
          'user': options.login,
          'password': options.password
        })

        this.matrixAuthed = this.matrix.matrixAuthClient
        this.homeServer = options.providerURL

        if (this.matrix) {
          this.matrix.registerSuccessfulSyncListener((client)=>{
          })
        }
        localStorage.setItem('refresh_token', data.access_token)
        localStorage.setItem('refresh_login', data.user_id)
        localStorage.setItem('refresh_home', this.homeServer)
        return data
      }
    },

    async refresh() {
      const token = localStorage.getItem('refresh_token')
      const login = localStorage.getItem('refresh_login')
      const home = localStorage.getItem('refresh_home')

      if (this.matrix && token) {
        this.syncReady = 
          await this.matrix.refreshAuth({
            baseUrl: home,
            userId: login,
            accessToken: token,
          })
        this.matrixAuthed = this.matrix.matrixAuthClient
        return token
      }

    },
  }
})
