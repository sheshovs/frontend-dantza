import { getAxiosInstance } from '@/config/axios'

const axiosInstance = getAxiosInstance(import.meta.env.VITE_BACKEND_URL)

const API = {
  login: (email: string, password: string) => {
    return axiosInstance.post(`/auth/login`, { email, password })
  },
  currentUser: () => {
    return axiosInstance.get(`/auth/current`)
  },
}

export default API
