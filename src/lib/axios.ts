import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.apirUrl

console.log(API_URL)

if (!API_URL) {
  throw new Error('❌ API_URL não definido! Verifique o app.config.js e as variáveis de ambiente.')
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
})

export default api
