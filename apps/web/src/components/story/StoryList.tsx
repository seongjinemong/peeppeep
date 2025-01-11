import { StoryContentType } from '@/types'

import { StoryFeed } from './StoryFeed'

function StoryList({ contents }: { contents: StoryContentType[] }) {
  return (
    <div className='w-full grid grid-cols-4 gap-4'>
      {contents.map((content) => (
        <StoryFeed key={content.userId} content={content} />
      ))}
    </div>
  )
}

export default StoryList
