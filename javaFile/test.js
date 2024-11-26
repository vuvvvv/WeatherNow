import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

export const ENV_VARS = {
  LO_K_SECRET: process.env.LO_K_SECRET,
  WE_K_SECRET: process.env.WE_K_SECRET
}

export function getkey (key) {
  if (key == 0) {
    return ENV_VARS
  }
  return null
}
