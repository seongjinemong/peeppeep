import { StoryContentType } from '@/types'

export function StoryFeed({ content }: { content: StoryContentType }) {
  return (
    <div className='w-full flex flex-col shrink-0 pb-3 pt-1 bg-background-gray rounded-xl snap-start'>
      <div className=''>{content.title}</div>
      <div
        style={{ backgroundImage: `url(${content.imageUrl})` }}
        className='w-full flex-1 max-h-40 min-h-0 h-full bg-cover bg-center'
      ></div>
      <div className='bg-gradient-to-t from-black/40 to-white mt-10'>
        {content.userName}
      </div>
    </div>
  )
}
