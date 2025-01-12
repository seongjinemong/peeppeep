import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://d2d8-210-94-220-230.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json'
  }
})
