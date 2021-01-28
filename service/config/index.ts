export const DEV = process.env.NODE_ENV === 'development'
export const ROOT = DEV
  ? 'http://localhost:3000'
  : 'https://bonfire.sospedra.me'
