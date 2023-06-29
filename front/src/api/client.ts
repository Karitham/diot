/// <reference types="vite/client" />
import createClient from 'openapi-fetch'
import { paths } from './api'
import useAuth from './useAuth'

export const API_URL = 'https://api.idiot.0xf.fr/v1'
// export const API_URL = 'http://localhost:7667/v1'

const [getToken] = useAuth()

export const client = createClient<paths>({
  baseUrl: API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
