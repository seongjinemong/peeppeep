import {
  commentLikeRequsetType,
  commentRequsetType,
  postCommentApi,
  postCommentLikeApi
} from '@/apis/commentApi'
import { useMutation } from '@tanstack/react-query'

import useFeedQuery from './useFeedQuery'

const usePostComment = () => {
  return useMutation({
    mutationFn: (requset: commentRequsetType) => postCommentApi(requset)
  })
}

const usePostCommentLike = () => {
  return useMutation({
    mutationFn: (requset: commentLikeRequsetType) => postCommentLikeApi(requset)
  })
}

const useCommentQuery = () => {
  const { mutate: postComment } = usePostComment()
  const { mutate: postCommentLike } = usePostCommentLike()
  const handlePostComment = (requset: commentRequsetType) => {
    postComment(requset)
  }
  const handlePostCommentLike = (requset: commentLikeRequsetType) => {
    postCommentLike(requset)
  }
  return { handlePostComment, handlePostCommentLike }
}
export default useCommentQuery
