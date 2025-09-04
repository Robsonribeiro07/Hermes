import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.0.109:3000/api/',
})

export default api
