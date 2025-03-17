export default class AuthApi {
  public isAuth: boolean

  constructor() {
    this.isAuth = false
  }

  async login(params: any) {
    if (!params?.login || !params?.password) {
      return null
    }

    this.isAuth = true
    return {
      'token': crypto.randomUUID()
    }
  }

  async getAuthData() {
    if(!this.isAuth) {
      return {}
    }

    return {
      'token': crypto.randomUUID()
    }
  }

  async logout() {
    this.isAuth = false
  }
}