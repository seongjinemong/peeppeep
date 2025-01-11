import { FeedType } from '@/types'
import {
  ChatBubbleLeftIcon,
  BookmarkIcon,
  ShareIcon,
  UserCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import React from 'react'

const FeedCard = ({ feed }: { feed: FeedType }) => {
  // 날짜 포맷팅 함수
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString)
  //   return new Intl.DateTimeFormat('ko-KR', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   }).format(date)
  // }

  return (
    <div className='w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
      <div className='p-6'>
        {/* Header - User Info */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
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
          <span className='text-xs text-gray-500'>
            {/* {formatDate(feed.created_at)} */}
          </span>
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

          {feed.image_url && (
            <div className='mt-4'>
              <img
                src={feed.image_url}
                alt={feed.title}
                className='rounded-lg w-full h-48 object-cover'
              />
            </div>
          )}

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
              <span className='text-sm'>댓글 {feed.comment?.length || 0}</span>
            </button>
            <button className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'>
              <BookmarkIcon className='h-5 w-5 mr-1' />
              <span className='text-sm'>저장</span>
            </button>
            {/* {feed.updated_at !== feed.created_at && (
              <span className='text-xs text-gray-500'>
                수정됨 {formatDate(feed.updated_at)}
              </span>
            )} */}
          </div>

          <button className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'>
            <ShareIcon className='h-5 w-5 mr-1' />
            <span className='text-sm'>공유</span>
          </button>
        </div>

        {/* Comments Preview */}
        {feed.comment && feed.comment.length > 0 && (
          <div className='mt-4 pt-4 border-t border-gray-100'>
            <div className='text-sm text-gray-500 mb-2'>최근 댓글</div>
            <div className='space-y-2'>
              {feed.comment.slice(0, 2).map((comment) => (
                <div key={comment._id} className='flex items-start space-x-2'>
                  <div className='flex-shrink-0'>
                    <UserCircleIcon className='w-6 h-6 text-gray-400' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-sm font-medium'>
                        {comment.userId}
                      </span>
                      {/* <span className='text-xs text-gray-500'>
                        {formatDate(comment.created_at)}
                      </span> */}
                    </div>
                    <p className='text-sm text-gray-600'>{comment.content}</p>
                    <div className='flex items-center space-x-2 mt-1'>
                      <HeartIcon className='w-4 h-4 text-gray-400' />
                      <span className='text-xs text-gray-500'>
                        {comment.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedCard
