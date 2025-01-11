import StoryContent from '@components/story/StoryContent'
import StoryList from '@components/story/StoryList'

export function Story() {
  return (
    <div className='draggableNone w-full h-[calc(100vh-4rem)] bg-background-gray decoration-background-disabled'>
      <main className='max-w-4xl mx-auto h-full'>
        <div className='w-full max-w-lg mx-auto overflow-y-auto h-full bg-background-tertiary flex flex-col relative snap-y snap-mandatory'>
          <StoryList />
        </div>
      </main>
    </div>
  )
}
