import { CommentType } from '@/types'
import { HeartIcon, UserCircleIcon } from '@heroicons/react/16/solid'

import CustomIcon from '@components/common/CustomIcons'

import { useAuth } from '@hooks/useAuth'

import { formatDate } from '@utils/format'

export default function CommentList({
  handleCommentClick,
  isCommentOpen,
  commentList
}: {
  handleCommentClick: () => void
  isCommentOpen: boolean
  commentList: CommentType[]
}) {
  const { user } = useAuth()
  return (
    <div
      className={`flex-1 bg-background-primary rounded-lg shadow-sm relative w-full overflow-hidden transition-all duration-300 ${
        isCommentOpen ? 'max-h-[32rem]' : 'max-h-0'
      }`}
    >
      {commentList.length > 0 ? (
        <div className='w-full h-full flex flex-col pt-2 px-2'>
          <div className='flex-1 overflow-y-auto space-y-4'>
            {commentList.map((comment: CommentType) => (
              <div
                key={comment.userId}
                className='group rounded-lg p-3 transition-colors'
              >
                <div className='flex items-start space-x-3'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                      <UserCircleIcon className='w-6 h-6 text-gray-500' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium text-gray-900'>
                          {comment.userId}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <button
                          className={`flex items-center gap-1 transition-colors`}
                        >
                          <CustomIcon
                            name='HeartIcon'
                            className={`w-6 h-6 ${
                              comment.likedUser.includes(user?.userId || '')
                                ? 'text-rose-500'
                                : 'text-gray-500'
                            }`}
                          />
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

          <div className='border-t border-gray-100 flex items-center py-2 shrink-0'>
            <div className='flex items-center gap-3 w-full'>
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
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <p className='text-gray-500 text-sm'>
            답변이 없습니다. 등록해보세요!
          </p>
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
      )}
    </div>
  )
}
