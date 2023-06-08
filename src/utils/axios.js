import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'
const customFetch = axios.create({
  baseURL: 'https://jobster-api-x0hg.onrender.com/',
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
