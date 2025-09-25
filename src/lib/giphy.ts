import axios from 'axios'

const giphy = axios.create({
  baseURL: `https://api.giphy.com/v1/gifs`,
})

export default giphy
