import { defineStore } from 'pinia'
import { useAdapterStore } from './adapter'

interface AuthData {
  login: string,
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userData: {
      login: '',
      providerURL: '',
      token: '',
      data: null
    },
  }),

  getters: {
    isAuthenticated: state => {
      return Boolean(state.userData.token)
    },
    userName: state => {
      return state.userData.login
    },
    userId: state => {
      return state.userData.login
    }
  },

  actions: {
    setState(resp?: any) {
      if (localStorage) {
        this.userData.token = resp?.access_token || localStorage.getItem('refresh_token')
        this.userData.login = resp?.user_id || localStorage.getItem('refresh_login')
        this.userData.providerURL = localStorage.getItem('refresh_home') || ''
      }
    },

    async authLogin(params: AuthData) {
      try {
        const adapterStore = useAdapterStore()
        const authResp = await adapterStore.login(params)

        if (authResp?.access_token) {
          this.setState(authResp)
        }
        // @ts-ignore
        this.userData.data = authResp
      } catch (error) {}
    },

    async authCheck() {
      try {
        const adapterStore = useAdapterStore()
        const token = await adapterStore.refresh()
        if (token) {
          this.setState()
          return true
        }
        return false
      } catch (e) {
        this.userData.token = ''
        return false
      }
    },

    async logout() {

      return await this.authCheck
    }
  },
})
