/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_PORT: number
  readonly VITE_API_URL: string
  readonly VITE_DROP_CONSOLE: boolean
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 