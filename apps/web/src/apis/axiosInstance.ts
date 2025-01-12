import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json'
  }
})
