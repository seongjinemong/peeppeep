import useStoryStore from '@stores/storyStore'
import { useEffect } from 'react'

import useStoryQuery from '@hooks/queries/useStory'

import { StoryFeed } from './StoryFeed'

function StoryList() {
  const { handleGetStory } = useStoryQuery()

  useEffect(() => {
    handleGetStory()
  }, [])
  const story = useStoryStore((s) => s.story)
  return (
    <div className='w-full flex gap-3 h-96 max-w-7xl mx-auto overflow-x-auto'>
      {story.map((v) => (
        <StoryFeed key={v._id} content={v} />
      ))}
    </div>
  )
}

export default StoryList
