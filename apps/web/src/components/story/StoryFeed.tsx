import { FeedType } from '@/types'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import CustomIcon from '@components/common/CustomIcons'

export function StoryFeed({ content }: { content: FeedType }) {
  const navigate = useNavigate()
  return (
    <div
      className='w-64 flex flex-col shrink-0 border border-slate-200 hover:border-slate-400 px-4 py-4 shadow-sm rounded-xl overflow-hidden gap-3 transition-colors cursor-pointer'
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
          style={{
            backgroundImage: `url(${
              content.vurl.includes('velog')
                ? 'https://images.velog.io/images/kim-mg/post/b6928585-e245-4e5f-b878-0bbf278e5886/velog_logo.png'
                : content.vurl.includes('tistory')
                  ? 'https://velog.velcdn.com/images%2Fsnoop2head%2Fpost%2F743a1b1a-4273-4f4f-94a5-14b8cf35a23c%2Ftistory.jpeg'
                  : 'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg'
            })`
          }}
          className='absolute inset-0 bg-contain bg-center transition-transform duration-300'
        />
      </div>

      <div className='flex flex-col gap-3 mt-2'>
        <div className='flex gap-1 overflow-x-hidden whitespace-nowrap'>
          {content.tags.map((tag, index) => (
            <span
              key={index}
              className='py-1 rounded-full bg-background-secondary/20 text-secondary text-sm'
            >
              #{tag}{' '}
            </span>
          ))}
        </div>

        <div className='flex items-center gap-3 justify-between'>
          <div className='flex gap-2'>
            <div className='flex items-center justify-center w-6 h-6 bg-secondary rounded-full'>
              {content.userInfo.userProfileUrl ? (
                <img
                  src={content.userInfo.userProfileUrl}
                  alt='user profile'
                  className='w-full h-full object-cover rounded-full'
                />
              ) : (
                <UserCircleIcon className='w-6 h-6 text-secondary' />
              )}
            </div>
            <span className='text-secondary font-medium'>
              {content.userInfo.userName}
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
