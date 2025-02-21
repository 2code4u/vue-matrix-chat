import { createClient, MatrixClient, ClientEvent, SyncState } from "matrix-js-sdk";

export class TMatrixClient {
  private readonly matrixClient: MatrixClient;

  constructor() {
    this.matrixClient = createClient({baseUrl: 'https://matrix.org'})
    this.matrixClient.startClient();

    // Register a sync listener that only logs the sync state changes.
    this.matrixClient.once(ClientEvent.Sync, (state: SyncState, prevState: SyncState | null) => {
      if (state !== prevState) {
        console.log(`Sync ${prevState}->${state}`);
      }
    })
  }

  public registerSuccessfulSyncListener(cb: (matrixClient: MatrixClient) => void) {
    this.matrixClient.once(ClientEvent.Sync, async (state: string) => {
      if (state === SyncState.Syncing) {
        await cb(this.matrixClient)
      }
    })
  }

  public mxcUrlToHttp(url: string) {
    return this.matrixClient.mxcUrlToHttp(url)
  }
}

// singleton.
let matrixClient: TMatrixClient | undefined = undefined

export function getMatrixClient() {
  if (matrixClient === undefined) {
    matrixClient = new TMatrixClient()
  }

  return matrixClient
}