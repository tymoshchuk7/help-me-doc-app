/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_NODE_ENV: 'development' | 'production' | 'test'
    VITE_AUTH0_CLIENT_ID: string,
    VITE_AUTH0_DOMAIN: string,
    VITE_API_URL: string,
  }
}
