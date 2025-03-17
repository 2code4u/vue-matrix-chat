import { createClient, MatrixClient, IndexedDBStore, ClientEvent, SyncState } from "matrix-js-sdk";

export type {MatrixClient} 
export class TMatrixClient {
  private readonly matrixClient: MatrixClient;
  public matrixAuthClient: MatrixClient | undefined;
  public syncReady: boolean

  constructor(options: any) {
    this.matrixClient = createClient({
      'baseUrl': options.providerURL,
    })
    this.syncReady = false
  }

  public async loginRequest(options: any) {
    const authResp = await this.matrixClient.loginRequest({
      'type': 'm.login.password',
      'user': options.user,
      'password': options.password
    })

    this.matrixAuthClient = await createClient({
      'baseUrl': 'https://' + options.providerURL,
      'userId': authResp.user_id,
      'accessToken': authResp.access_token,
      // 'store': storeMx,
    })

    // this.matrixAuthClient.startClient()
    // Register a sync listener that only logs the sync state changes.
    this.matrixAuthClient.once(ClientEvent.Sync, (state: SyncState, prevState: SyncState | null) => {
      console.log(`Sync`)
      if (state !== prevState) {
        console.log(`Sync ${prevState}->${state}`)
      }
    })
    return authResp
  }

  public async refreshAuth({baseUrl, userId, accessToken}: any): Promise<boolean> {
    return new Promise (async (resolve) => {
      this.matrixAuthClient = await createClient({
        'baseUrl': 'https://' + baseUrl,
        'userId': userId,
        'accessToken': accessToken,
        // 'store': storeMx,
      })
      this.matrixAuthClient.startClient({ initialSyncLimit: 4 })

      this.matrixAuthClient.once(ClientEvent.Sync, (state: SyncState, prevState: SyncState | null) => {
        console.log(`Sync`)
        resolve(true)
        if (state !== prevState) {
          console.log(`Sync ${prevState}->${state}`)
        }
      })
    })
  }

  public registerSuccessfulSyncListener(cb: (matrixClient: MatrixClient) => void) {
    if (!this.matrixAuthClient) return

    this.matrixAuthClient.once(ClientEvent.Sync, async (state: string) => {
      if (state === SyncState.Syncing) {
        if (!this.matrixAuthClient) return

        await cb(this.matrixAuthClient)
      }
    })
  }

  public mxcUrlToHttp(url: string) {
    if (this.matrixAuthClient) {
      return this.matrixAuthClient.mxcUrlToHttp(url, 80, 80, 'scale')
    }
  }
}

// singleton.
let matrixClient: TMatrixClient | undefined = undefined
const opts = { 'indexedDB': window.indexedDB, 'localStorage': window.localStorage };
// const storeMx = new IndexedDBStore(opts);

export function getMatrixClient(options: any) {
  if (matrixClient === undefined) {
    matrixClient = new TMatrixClient(options)
  }

  return matrixClient
}