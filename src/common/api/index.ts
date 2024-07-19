import { getAxiosInstance } from '@/config/axios'
import {
  Teacher,
  Discipline,
  DisciplineReturn,
  TeacherReturn,
  DisciplineOneReturn,
  Event,
  EventReturn,
} from '../types'

const axiosInstance = getAxiosInstance(import.meta.env.VITE_BACKEND_URL)

const API = {
  login: (email: string, password: string) => {
    return axiosInstance.post(`/auth/login`, { email, password })
  },
  currentUser: () => {
    return axiosInstance.get(`/auth/current`)
  },
  discipline: {
    create: (data: Discipline): Promise<{ data: DisciplineReturn }> => {
      const formData = new FormData()
      formData.append(`name`, data.name)
      formData.append(`description`, data.description)
      data.images.forEach((image) => {
        formData.append(`images`, image)
      })
      formData.append(`schedule`, JSON.stringify(data.categorySchedule))
      formData.append(`mainImageName`, data.mainImageName)

      return axiosInstance.post(`/discipline`, formData)
    },
    update: (data: Discipline, uuid: string): Promise<{ data: DisciplineReturn }> => {
      const formData = new FormData()
      formData.append(`name`, data.name)
      formData.append(`description`, data.description)
      data.images.forEach((image) => {
        formData.append(`images`, image)
      })
      data.imagesUploaded.forEach((image) => {
        formData.append(`imagesUploaded`, image.uuid)
      })
      formData.append(`mainImageName`, data.mainImageName)
      formData.append(`schedule`, JSON.stringify(data.categorySchedule))

      return axiosInstance.patch(`/discipline/${uuid}`, formData)
    },
    delete: (uuid: string) => {
      return axiosInstance.delete(`/discipline/${uuid}`)
    },
    getAll: (): Promise<DisciplineReturn[]> => {
      return axiosInstance.get(`/discipline`)
    },
    getById: (uuid: string): Promise<{ data: DisciplineOneReturn }> => {
      return axiosInstance.get(`/discipline/${uuid}`)
    },
  },
  teacher: {
    create: (data: Teacher) => {
      const formData = new FormData()
      formData.append(`name`, data.name)
      formData.append(`description`, data.description)
      data.images.forEach((image) => {
        formData.append(`images`, image)
      })
      data.disciplines.forEach((discipline) => {
        formData.append(`disciplines`, discipline.uuid)
      })
      formData.append(`mainImageName`, data.mainImageName)

      return axiosInstance.post(`/teacher`, formData)
    },
    update: (data: Teacher, uuid: string) => {
      const formData = new FormData()
      formData.append(`name`, data.name)
      formData.append(`description`, data.description)
      data.images.forEach((image) => {
        formData.append(`images`, image)
      })
      data.imagesUploaded.forEach((image) => {
        formData.append(`imagesUploaded`, image.uuid)
      })
      data.disciplines.forEach((discipline) => {
        formData.append(`disciplines`, discipline.uuid)
      })
      formData.append(`mainImageName`, data.mainImageName)

      return axiosInstance.patch(`/teacher/${uuid}`, formData)
    },
    delete: (uuid: string) => {
      return axiosInstance.delete(`/teacher/${uuid}`)
    },
    getAll: (): Promise<{ data: TeacherReturn[] }> => {
      return axiosInstance.get(`/teacher`)
    },
    getById: (uuid: string): Promise<{ data: TeacherReturn }> => {
      return axiosInstance.get(`/teacher/${uuid}`)
    },
  },
  event: {
    create: (data: Event) => {
      const formData = new FormData()
      formData.append(`name`, data.name)
      formData.append(`description`, data.description)
      formData.append(`date`, data.date?.format(`YYYY-MM-DD HH:mm`) || ``)
      formData.append(`location`, data.location)
      data.images.forEach((image) => {
        formData.append(`images`, image)
      })
      formData.append(`mainImageName`, data.mainImageName)

      return axiosInstance.post(`/event`, formData)
    },
    update: (data: Event, uuid: string) => {
      const formData = new FormData()
      formData.append(`name`, data.name)
      formData.append(`description`, data.description)
      formData.append(`date`, data.date?.format(`YYYY-MM-DD HH:mm`) || ``)
      formData.append(`location`, data.location)
      data.images.forEach((image) => {
        formData.append(`images`, image)
      })
      data.imagesUploaded.forEach((image) => {
        formData.append(`imagesUploaded`, image.uuid)
      })
      formData.append(`mainImageName`, data.mainImageName)

      return axiosInstance.patch(`/event/${uuid}`, formData)
    },
    delete: (uuid: string) => {
      return axiosInstance.delete(`/event/${uuid}`)
    },
    getAll: (): Promise<{ data: EventReturn[] }> => {
      return axiosInstance.get(`/event`)
    },
    getAllNext: (): Promise<{ data: EventReturn[] }> => {
      return axiosInstance.get(`/event/next`)
    },
  },
}

export default API
