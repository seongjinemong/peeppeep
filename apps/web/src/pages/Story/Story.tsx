import { tempStoryContent } from '@constants/temp.constant'

import StoryContent from '@components/story/StoryContent'

export function Story() {
  return (
    <div className='draggableNone w-full h-[calc(100vh-4rem)] bg-background-gray decoration-background-disabled'>
      <main className='max-w-4xl mx-auto h-full'>
        <div className='w-full max-w-lg mx-auto overflow-y-auto h-full bg-background-tertiary flex flex-col relative snap-y snap-mandatory'>
          {tempStoryContent.map((content, index) => (
            <StoryContent key={index} content={content} />
          ))}
        </div>
      </main>
    </div>
  )
}
