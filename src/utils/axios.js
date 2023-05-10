import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'https://jobster-api-x0hg.onrender.com',
})

export default customFetch
