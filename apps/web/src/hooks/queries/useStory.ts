import { FeedType } from '@/types'
import useStoryStore from '@stores/storyStore'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { getStoryApi } from '@apis/feedApi'

const useGetStory = (setStory: (story: FeedType[]) => void) => {
  return useMutation({
    mutationFn: getStoryApi,
    onSuccess: (data) => {
      setStory(data.body)
    },
    onError: (error) => {
      console.error('getStory Error:', error)
      toast.error('스토리 조회 실패')
    }
  })
}
const useStoryQuery = () => {
  const { setStory } = useStoryStore()

  const { mutate: getStory } = useGetStory(setStory)
  const handleGetStory = () => {
    getStory()
  }
  return { handleGetStory }
}

export default useStoryQuery
