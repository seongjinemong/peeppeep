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

import { formatDate } from '@utils/format'

const FeedCard = ({ feed }: { feed: FeedType }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const handleCommentClick = () => {
    setIsCommentOpen(!isCommentOpen)
  }

  return (
    <div className='w-full flex flex-col gap-4 max-w-4xl mx-auto'>
      <div
        className={`w-full flex gap-4 shrink-0 justify-center transition-all duration-1000 h-full`}
      >
        <div
          className={`w-full flex flex-col bg-background-primary h-full rounded-lg p-4 shadow-md hover:shadow-lg`}
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
              {formatDate(feed.created_at)}
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
                {feed.updated_at !== feed.created_at && (
                  <span className='text-xs text-gray-500'>
                    수정됨 {formatDate(feed.updated_at)}
                  </span>
                )}
              </div>
              <button className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'>
                <ShareIcon className='h-5 w-5 mr-1' />
                <span className='text-sm'>공유</span>
              </button>
            </div>
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
      className={`flex-1 bg-background-primary rounded-lg shadow-sm relative w-full overflow-hidden transition-all duration-300 ${
        isCommentOpen ? 'max-h-[32rem]' : 'max-h-0'
      }`}
    >
      <div className='w-full h-full flex flex-col p-4'>
        {/* 댓글 목록 */}
        <div className='flex-1 overflow-y-auto space-y-4 mb-4'>
          {commentList.map((comment) => (
            <div
              key={comment.userId}
              className='group hover:bg-gray-50 rounded-lg p-3 transition-colors'
            >
              <div className='flex items-start space-x-3'>
                <div className='flex-shrink-0'>
                  <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                    <UserCircleIcon className='w-6 h-6 text-gray-500' />
                  </div>
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between mb-1'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-medium text-gray-900'>
                        {comment.userId}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <button className='text-gray-400 hover:text-gray-600'>
                        <ChatBubbleLeftIcon className='w-4 h-4' />
                      </button>
                      <button className='flex items-center gap-1 text-gray-400 hover:text-rose-500 transition-colors'>
                        <HeartIcon className='w-4 h-4' />
                        <span className='text-xs'>
                          {comment.likedUser.length}
                        </span>
                      </button>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 break-words'>
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='border-t border-gray-100 pt-4'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center'>
              <UserCircleIcon className='w-6 h-6 text-gray-500' />
            </div>
            <div className='flex-1 relative'>
              <input
                type='text'
                placeholder='댓글을 입력해주세요'
                className='w-full py-2 px-4 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all'
              />
              <button className='absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600'>
                <CustomIcon name='SendIcon' className='w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FeedCard
