import axios from 'axios'
import type { AxiosError } from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const detail =
      (error.response?.data as { detail?: string })?.detail ??
      error.message ??
      'Error de conexión con el servidor'

    return Promise.reject(new Error(detail))
  }
)
