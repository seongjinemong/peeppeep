import { axiosInstance } from './axiosInstance'

type CommentType = {
  userId: string
  content: string
}
export type commentRequsetType = {
  feed_id: string
  comment: CommentType
}
export const postCommentApi = async (requset: commentRequsetType) => {
  const { feed_id, comment } = requset
  console.log(requset)
  const response = await axiosInstance.post(`/comments/${feed_id}/add`, comment)
  return response.data
}

export const deleteCommentApi = async (commentId: string) => {
  const response = await axiosInstance.delete(`/comments/${commentId}`)
  return response.data
}

export interface commentLikeRequsetType {
  userId: string
  feedId: string
  commentorId: string
}
export const postCommentLikeApi = async (requset: commentLikeRequsetType) => {
  const { userId, feedId, commentorId } = requset
  const response = await axiosInstance.post(`/comments/${feedId}/like`, {
    userId,
    commentorId
  })
  return response.data
}

export interface feedLikeRequsetType {
  userId: string
  feedId: string
}
export const postFeedLikeApi = async (requset: feedLikeRequsetType) => {
  const { userId, feedId } = requset
  const response = await axiosInstance.post(`/feeds/${feedId}/like`, {
    userId
  })
  return response.data
}
