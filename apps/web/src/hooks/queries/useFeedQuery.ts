import { FeedType } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useState } from 'react'

import { getFeedApi, postFeedAPi, postLinkApi } from '@apis/feedApi'

const useGetFeedQuery = ({
  setFeeds
}: {
  setFeeds: (feeds: FeedType[]) => void
}) => {
  return useMutation({
    mutationFn: getFeedApi,
    onSuccess: (data) => {
      console.log('=====getFeedApi=====', data)
      setFeeds(data.body)
    }
  })
}

const usePostFeedQuery = () => {
  return useMutation({
    mutationFn: postFeedAPi,
    onSuccess: (data) => {
      console.log('=====postFeedAPi=====', data)
    }
  })
}
const usePostLinkQuery = ({
  setAnalyzeForm
}: {
  setAnalyzeForm: (feed: FeedType[]) => void
}) => {
  return useMutation({
    mutationFn: postLinkApi,
    onSuccess: (data) => {
      console.log('=====postLinkApi=====', data)
    }
  })
}

export default function useFeedQuery() {
  const [feeds, setFeeds] = useState<FeedType[]>([])
  const [analyzeForm, setAnalyzeForm] = useState<FeedType[]>([])

  const { mutate: getFeed, isPending } = useGetFeedQuery({ setFeeds })
  const { mutate: postLink, isPending: isPostLinkPending } = usePostLinkQuery({
    setAnalyzeForm
  })

  const handleGetFeed = async () => {
    getFeed()
  }
  const handlePostLink = async (link: string) => {
    postLink(link)
  }
  useEffect(() => {
    handleGetFeed()
  }, [])

  return {
    feeds,
    isPending,
    isPostLinkPending,
    handlePostLink,
    analyzeForm
  }
}
