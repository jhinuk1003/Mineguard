/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CIVIC_APP_ID: string
  readonly VITE_CIVIC_REDIRECT_URL: string
  readonly VITE_CIVIC_AUTH_SERVER_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 