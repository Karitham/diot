import createClient from 'openapi-fetch'
import { paths } from './api'

export const API_URL = 'http://localhost:7777/v1'

export const client = createClient<paths>({
  baseUrl: API_URL,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})
