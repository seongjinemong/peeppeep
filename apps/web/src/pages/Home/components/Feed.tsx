import { FeedType } from '@/types'
import {
  ChatBubbleLeftIcon,
  BookmarkIcon,
  ShareIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import React from 'react'

const FeedCard = ({ feed }: { feed: FeedType }) => {
  return (
    <div className='w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
      <div className='p-6'>
        {/* Header - User Info */}
        <div className='flex items-center mb-4'>
          <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
            <UserCircleIcon className='w-8 h-8 text-gray-500' />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-gray-900'>
              {feed.userName}
            </h3>
            <p className='text-xs text-gray-500'>{feed.topic}</p>
          </div>
        </div>

        {/* Content */}
        <div className='space-y-3'>
          <h2 className='text-xl font-bold text-gray-900'>{feed.title}</h2>

          {feed.question && (
            <div className='bg-blue-50 p-4 rounded-lg'>
              <p className='text-blue-800 text-sm'>{feed.question}</p>
            </div>
          )}

          <p className='text-gray-600 text-sm leading-relaxed'>
            {feed.description}
          </p>

          {/* Tags */}
          <div className='flex flex-wrap gap-2 mt-4'>
            {feed.tags.map((tag, index) => (
              <span
                key={index}
                className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer - Actions */}
        <div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-100'>
          <div className='flex items-center space-x-4'>
            <button className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'>
              <ChatBubbleLeftIcon className='h-5 w-5 mr-1' />
              <span className='text-sm'>댓글</span>
            </button>
            <button className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'>
              <BookmarkIcon className='h-5 w-5 mr-1' />
              <span className='text-sm'>저장</span>
            </button>
          </div>

          <button className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'>
            <ShareIcon className='h-5 w-5 mr-1' />
            <span className='text-sm'>공유</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// 사용 예시를 위한 데모 컴포넌트
const Feed = ({ sampleFeed }: { sampleFeed: FeedType[] }) => {
  return (
    <div className='w-full flex flex-col gap-4 max-w-4xl mx-auto'>
      {sampleFeed.map((item) => (
        <FeedCard key={item.id} feed={item} />
      ))}
    </div>
  )
}

export { Feed }
