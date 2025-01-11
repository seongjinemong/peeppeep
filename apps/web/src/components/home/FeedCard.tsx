import { CommentType, FeedType } from '@/types'
import {
  ChatBubbleLeftIcon,
  BookmarkIcon,
  ShareIcon,
  UserCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import React, { useState } from 'react'

import CustomIcon from '@components/common/CustomIcons'

const FeedCard = ({ feed }: { feed: FeedType }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const handleCommentClick = () => {
    setIsCommentOpen(!isCommentOpen)
  }

  return (
    <div
      className={`w-full flex gap-4 justify-center h-full ${isCommentOpen ? 'h-[40rem]' : 'h-fit'}`}
    >
      <div
        className={`max-w-4xl flex flex-col bg-background-primary transition-[max-height] duration-300 h-full rounded-lg p-4 shadow-md hover:shadow-lg`}
      >
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

        <div className='space-y-3 flex-1'>
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
        </div>

        <div className='flex flex-col mt-1 gap-2'>
          <div className='flex flex-wrap gap-2'>
            {feed.tags.map((tag, index) => (
              <span
                key={index}
                className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200'
              >
                {tag}
              </span>
            ))}
          </div>

          <div className='flex flex-1 h-full items-center pt-4 justify-between border-t border-gray-100'>
            <div className='flex items-center space-x-4'>
              <button className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'>
                <HeartIcon className='h-5 w-5 mr-1' />
                <span className='text-sm'>좋아요 {0}</span>
              </button>
              <button
                onClick={handleCommentClick}
                className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'
              >
                <ChatBubbleLeftIcon className='h-5 w-5 mr-1' />
                <span className='text-sm'>
                  댓글 {feed.comment?.length || 0}
                </span>
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

          <div className='pt-2 shadow-inset-t'>
            {feed.comment && feed.comment.length > 0 && (
              <div className='space-y-2'>
                <div
                  key={feed.comment[0].userId}
                  className='flex items-start space-x-2'
                >
                  <div className='flex-shrink-0'>
                    <UserCircleIcon className='w-6 h-6 text-gray-400' />
                  </div>
                  <div className='flex-1 flex justify-between'>
                    <div>
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm font-medium'>
                          {feed.comment[0].userId}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {/* {formatDate(feed.comment[0].created_at)} */}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600'>
                        {feed.comment[0].content}
                      </p>
                    </div>
                    <div className='flex items-center space-x-2 mt-1'>
                      <HeartIcon className='w-4 h-4 text-gray-400' />
                      <span className='text-xs text-gray-500'>
                        {feed.comment[0].likedUser.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CommentList
        commentList={feed.comment}
        handleCommentClick={handleCommentClick}
        isCommentOpen={isCommentOpen}
      />
    </div>
  )
}

function CommentList({
  handleCommentClick,
  isCommentOpen,
  commentList
}: {
  handleCommentClick: () => void
  isCommentOpen: boolean
  commentList: CommentType[]
}) {
  return (
    <div
      className={`flex-1 bg-background-primary relative w-full overflow-hidden transition-all duration-300 ${isCommentOpen ? 'max-w-full' : 'max-w-0'}`}
    >
      <div
        className='absolute top-4 right-4 cursor-pointer'
        onClick={handleCommentClick}
      >
        <CustomIcon name='XMarkIcon' className='w-8 h-8 text-black' />
      </div>
      <div className='w-full h-full flex flex-col gap-4'>
        {/* {commentList.map((comment) => (
          <div key={comment.userId}>{comment.content}</div>
        ))} */}
      </div>
    </div>
  )
}

export default FeedCard
