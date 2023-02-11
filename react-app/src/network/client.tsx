import axios, { type AxiosInstance } from 'axios'

const client = (): AxiosInstance => {
  const instance = axios.create()

  instance.interceptors.request.use(async (config) => ({
    ...config,
    baseURL: 'http://localhost:3003'
  }))

  return instance
}

export default client
