import AuthApi from './auth/auth.ts'

export default class Api {
  public auth: AuthApi

  constructor() {
    this.auth = new AuthApi()
  }
}