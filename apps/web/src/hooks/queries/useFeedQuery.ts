import { FeedType } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useState } from 'react'

import { getFeedApi, postFeedAPi } from '@apis/feedApi'

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

export default function useFeedQuery() {
  const [feeds, setFeeds] = useState<FeedType[]>([])

  const { mutate: getFeed, isPending } = useGetFeedQuery({ setFeeds })

  const handleGetFeed = async () => {
    getFeed()
  }
  useEffect(() => {
    handleGetFeed()
  }, [])

  return {
    feeds,
    isPending
  }
}
