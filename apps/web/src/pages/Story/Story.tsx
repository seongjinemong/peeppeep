import useStoryStore from '@stores/storyStore'
import { useEffect } from 'react'

import StoryContent from '@components/story/StoryContent'
import StoryList from '@components/story/StoryList'

import useStoryQuery from '@hooks/queries/useStory'

export function Story() {
  const story = useStoryStore((s) => s.story)
  const { handleGetStory } = useStoryQuery()
  useEffect(() => {
    handleGetStory()
  }, [])
  return (
    <div className='draggableNone w-full h-[calc(100vh-4rem)] bg-background-gray'>
      <main className='max-w-4xl mx-auto h-full'>
        <div className='w-full max-w-lg mx-auto bg-background-gray overflow-y-auto h-full flex flex-col relative snap-y snap-mandatory'>
          {story && story?.length ? (
            story.map((v) => <StoryContent key={v._id} content={v} />)
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <p className='text-tertiary'>스토리가 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
