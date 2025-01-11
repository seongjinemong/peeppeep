import { StoryContentType } from '@/types'
import { useEffect } from 'react'

import useStoryQuery from '@hooks/queries/useStory'

import { StoryFeed } from './StoryFeed'

function StoryList() {
  const { story, handleGetStory } = useStoryQuery()
  useEffect(() => {
    handleGetStory()
  }, [])
  return (
    <div className='w-full flex gap-3 h-96 max-w-7xl mx-auto overflow-x-auto'>
      {story.map((v) => (
        <StoryFeed key={v._id} content={v} />
      ))}
    </div>
  )
}

export default StoryList
