import { axiosInstance } from './axiosInstance'

export interface UserRequsetType {
  userId: string
  email: string
  userProfileUrl: string
  userName: string
}
export const postUserApi = async (user: UserRequsetType) => {
  const response = await axiosInstance.post('/login', user)
  return response.data
}
