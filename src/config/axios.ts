import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const requestHandler = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (config.headers) {
    if (typeof window !== `undefined`) {
      const token: string = window.localStorage.getItem(`dantza_token`) ?? ``
      if (token) {
        config.headers.Authorization = token
      }
    }
  }
  return config
}

export function getAxiosInstance(baseURL?: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL,
  })
  axiosInstance.interceptors.request.use(requestHandler, (error) => Promise.reject(error))
  return axiosInstance
}
