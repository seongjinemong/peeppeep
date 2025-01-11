import { StoryContentType } from '@/types'

import { StoryFeed } from './StoryFeed'

function StoryList({ contents }: { contents: StoryContentType[] }) {
  return (
    <div className='w-full flex gap-3 h-96 max-w-7xl mx-auto overflow-x-auto'>
      {contents.map((content) => (
        <StoryFeed key={content.userId} content={content} />
      ))}
    </div>
  )
}

export default StoryList
