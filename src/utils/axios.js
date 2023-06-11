import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'
const customFetch = axios.create({
  baseURL: 'https://phoenix-jobster-api.onrender.com',
})

customFetch.interceptors.request.use((config) => {
  let token
  if (getUserFromLocalStorage()) {
    token = getUserFromLocalStorage().user.token
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default customFetch
