declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_NODE_ENV: 'development' | 'production' | 'test'
    REACT_APP_AUTH0_CLIENT_ID: string,
    REACT_APP_AUTH0_DOMAIN: string,
    API_URL: string,
  }
}