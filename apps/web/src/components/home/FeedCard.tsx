import { CommentType, FeedType } from '@/types'
import {
  ChatBubbleLeftIcon,
  BookmarkIcon,
  ShareIcon,
  UserCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import CustomIcon from '@components/common/CustomIcons'

import useFeedQuery from '@hooks/queries/useFeedQuery'

import { formatDate } from '@utils/format'

import CommentList from './CommentList'

const FeedCard = ({ feed }: { feed: FeedType }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleCommentClick = () => {
    setIsCommentOpen(!isCommentOpen)
  }
  const { handlePostFeedLike } = useFeedQuery()

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('state') || '{}')?.user
      ?.userId
    console.log(userId, feed.likedUser)
    if (userId && feed.likedUser.includes(userId[0])) {
      setIsLiked(true)
    }
  }, [])

  return (
    <div className='w-full flex flex-col gap-2 max-w-4xl mx-auto mt-4'>
      <div
        className={`w-full flex gap-4 shrink-0 justify-center transition-all duration-1000 h-full`}
      >
        <div
          className={`w-full flex flex-col bg-background-primary h-full rounded-lg p-4 shadow-md hover:shadow-lg`}
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
                <img
                  src={feed.userInfo.userProfileUrl}
                  alt='user profile'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-gray-900'>
                  {feed.userInfo.userName}
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
                <p className='text-blue-800 text-base'>{feed.question}</p>
              </div>
            )}

            <p className='text-gray-600 text-base leading-relaxed'>
              {feed.description}
            </p>

            {feed.vurl && (
              <Link to={feed.vurl} target='_blank' className='text-blue-500'>
                {feed.vurl}
              </Link>
            )}
          </div>

          <div className='flex flex-col mt-2 gap-2'>
            <div className='flex flex-wrap gap-2'>
              {feed.tags.map((tag, index) => (
                <span
                  key={index}
                  className='inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200'
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className='flex flex-1 h-full items-center pt-4 justify-between border-t border-gray-100'>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => {
                    handlePostFeedLike(feed._id)
                    setIsLiked(!isLiked)
                  }}
                  className='flex items-center text-gray-500 hover:text-blue-600 transition-colors'
                >
                  <HeartIcon
                    className={`h-5 w-5 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  <span className='text-sm'>
                    좋아요 {feed.likedUser ? feed.likedUser.length : 0}
                  </span>
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
        feedId={feed._id}
        commentList={feed.comment}
        handleCommentClick={handleCommentClick}
        isCommentOpen={isCommentOpen}
      />
    </div>
  )
}
export default FeedCard
