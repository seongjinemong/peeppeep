import { FeedType, StoryContentType } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { getStoryApi } from '@apis/feedApi'

const useGetStory = (setStory: (story: StoryContentType[]) => void) => {
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
  const [story, setStory] = useState<StoryContentType[]>([])
  const { mutate: getStory } = useGetStory(setStory)
  const handleGetStory = () => {}
  return { handleGetStory, story }
}

export default useStoryQuery
