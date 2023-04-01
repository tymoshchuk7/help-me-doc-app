declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_AUTH0_CLIENT_ID: string,
      REACT_APP_AUTH0_DOMAIN: string,
    }
  }
}

export {};