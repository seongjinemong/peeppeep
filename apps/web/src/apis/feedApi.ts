import { FeedType } from '@/types'

import { axiosInstance } from './axiosInstance'

export const postFeedAPi = async (feed: FeedType) => {
  const response = await axiosInstance.post('/feed', feed)
  return response.data
}

export const getFeedApi = async () => {
  const response = await axiosInstance.get('/feeds')
  console.log(response.data)
  return response.data
}

export const postLinkApi = async (link: string) => {
  const response = await axiosInstance.post('/analyze-blog', { url: link })
  console.log(response.data)
  return response.data
}
