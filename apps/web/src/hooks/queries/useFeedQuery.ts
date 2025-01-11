import { FeedType, InputFormData } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

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

  const handlePostFeed = (feed: InputFormData) => {
    postFeed(feed)
    getFeed()
  }

  useEffect(() => {
    handleGetFeed()
  }, [])

  return {
    feeds,
    isGetFeedPending,
    isGetFeedError,
    handlePostFeed
  }
}
