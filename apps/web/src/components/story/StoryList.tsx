import { StoryContentType } from '@/types'

import { StoryFeed } from './StoryFeed'

function StoryList({ contents }: { contents: StoryContentType[] }) {
  return (
    <div className='w-full grid grid-cols-5 gap-3 h-96'>
      {contents.map((content) => (
        <StoryFeed key={content.userId} content={content} />
      ))}
    </div>
  )
}

export default StoryList
