import { FeedType, InputFormData } from '@/types'
import { useUserStore } from '@stores/userStore'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { postFeedLikeApi } from '@apis/commentApi'
import { getFeedApi, postFeedAPi, postLinkApi } from '@apis/feedApi'

const useGetFeedQuery = ({
  setFeeds
}: {
  setFeeds: (feeds: FeedType[]) => void
}) => {
  return useMutation({
    mutationFn: getFeedApi,
    onSuccess: (data) => {
      setFeeds(data.body)
    },
    onError: (error) => {
      console.error('getFeed Error:', error)
      toast.error('게시글 조회 실패')
    }
  })
}
const usePostFeedQuery = () => {
  return useMutation({
    mutationFn: postFeedAPi,
    onSuccess: () => {
      toast.success('게시글 추가 완료')
    },
    onError: () => {
      toast.error('게시글 추가 실패')
    }
  })
}

const usePostFeedLikeQuery = () => {
  const user = useUserStore((s) => s.user)
  return useMutation({
    mutationFn: postFeedLikeApi,
    onSuccess: () => {
      toast.success('게시글 좋아요 완료')
    },
    onError: () => {
      toast.success('게시글 좋아요 성공 ===== ' + user?.userName)
    }
  })
}

export default function useFeedQuery() {
  const [feeds, setFeeds] = useState<FeedType[]>([])
  const { mutate: postFeed } = usePostFeedQuery()
  const {
    mutate: getFeed,
    isPending: isGetFeedPending,
    isError: isGetFeedError
  } = useGetFeedQuery({ setFeeds })

  const handleGetFeed = () => {
    getFeed()
  }
  const user = useUserStore((s) => s.user)
  const handlePostFeed = (feed: InputFormData) => {
    postFeed({ ...feed, userId: user?.userId || '' })
  }

  useEffect(() => {
    handleGetFeed()
  }, [])

  const { mutate: postFeedLike } = usePostFeedLikeQuery()
  const handlePostFeedLike = (feedId: string) => {
    postFeedLike({ userId: user?.userId || '', feedId })
  }

  return {
    handleGetFeed,
    feeds,
    isGetFeedPending,
    isGetFeedError,
    handlePostFeed,
    handlePostFeedLike
  }
}
