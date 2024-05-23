import { getAxiosInstance } from '@/config/axios'
import { Discipline, DisciplineReturn } from '../types/discipline'

const axiosInstance = getAxiosInstance(import.meta.env.VITE_BACKEND_URL)

const API = {
  login: (email: string, password: string) => {
    return axiosInstance.post(`/auth/login`, { email, password })
  },
  currentUser: () => {
    return axiosInstance.get(`/auth/current`)
  },
  discipline: {
    create: (data: Discipline) => {
      const formData = new FormData()
      formData.append(`name`, data.name)
      formData.append(`description`, data.description)
      data.images.forEach((image) => {
        formData.append(`images`, image)
      })
      formData.append(`schedule`, JSON.stringify(data.schedule))

      return axiosInstance.post(`/discipline`, formData)
    },
    getAll: (): Promise<{ data: DisciplineReturn[] }> => {
      return axiosInstance.get(`/discipline`)
    },
  },
}

export default API
