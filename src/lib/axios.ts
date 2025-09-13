import axios from 'axios'

const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV
const API_URL =
  APP_ENV === 'production' ? process.env.EXPO_PUBLIC_URL_API : process.env.EXPO_PUBLIC_URL_API_DEV

if (!API_URL) {
  throw new Error('❌ API_URL não definido! Verifique suas variáveis de ambiente.')
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
})

export default api
