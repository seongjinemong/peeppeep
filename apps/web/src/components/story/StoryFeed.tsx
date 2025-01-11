import { StoryContentType } from '@/types'
import { useNavigate } from 'react-router-dom'

import CustomIcon from '@components/common/CustomIcons'

export function StoryFeed({ content }: { content: StoryContentType }) {
  const navigate = useNavigate()
  return (
    <div
      className='w-64 flex flex-col shrink-0 bg-sky-50 px-4 py-4 shadow-sm rounded-xl overflow-hidden gap-3 hover:bg-background-secondary/10 transition-colors cursor-pointer'
      onClick={() => navigate('/story')}
    >
      <div className='flex justify-between items-start mb-2'>
        <div>
          <h2 className='text-xl font-semibold text-secondary line-clamp-1'>
            {content.title}
          </h2>
          <div className='text-sm text-secondary/70 mt-1'>
            # {content.topic}
          </div>
        </div>
      </div>

      <div className='relative w-full aspect-video rounded-lg overflow-hidden flex-1'>
        <div
          style={{ backgroundImage: `url(${content.imageUrl})` }}
          className='absolute inset-0 bg-cover bg-center transition-transform duration-300'
        />
      </div>

      <div className='flex flex-col gap-3 mt-2'>
        <div className='flex gap-1 flex-wrap'>
          {content.tags.map((tag, index) => (
            <span
              key={index}
              className='py-1 rounded-full bg-background-secondary/20 text-secondary text-sm'
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className='flex items-center gap-3 justify-between'>
          <div className='flex gap-2'>
            <div className='flex items-center justify-center w-6 h-6 bg-secondary rounded-full'>
              <CustomIcon
                name='UserIcon'
                className='w-4 h-4 text-background-primary'
              />
            </div>
            <span className='text-secondary font-medium'>
              {content.userName}
            </span>
          </div>
          <span className='text-secondary font-medium flex items-center gap-1'>
            <CustomIcon name='HeartIcon' className='w-4 h-4 text-secondary' />2
          </span>
        </div>
      </div>
    </div>
  )
}
