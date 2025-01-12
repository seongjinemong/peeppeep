import { FeedType } from '@/types'
import { useUserStore } from '@stores/userStore'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import CustomIcon from '@components/common/CustomIcons'

import useFeedQuery from '@hooks/queries/useFeedQuery'
import useStoryQuery from '@hooks/queries/useStory'

function StoryContent({ content }: { content: FeedType }) {
  const { handleGetStory } = useStoryQuery()
  useEffect(() => {
    handleGetStory()
  }, [])
  return (
    <>
      <div className='w-full flex shrink-0 h-[calc(100vh-4rem)] pb-3 pt-1 snap-start snap-always'>
        <div className='w-full h-full flex flex-col rounded-2xl overflow-hidden bg-background-primary'>
          <StoryContentHeader content={content} />
          <StoryContentBody content={content} />
          <StoryContentBottom content={content} />
        </div>
      </div>
    </>
  )
}

function StoryContentHeader({ content }: { content: FeedType }) {
  const navigate = useNavigate()
  return (
    <div className='w-full flex justify-between items-end px-4 h-10 shrink-0'>
      <div className='flex gap-2'>
        <div
          className='flex items-center justify-center'
          onClick={() => navigate(-1)}
        >
          <CustomIcon
            name='ChevronBackIcon'
            className='w-7 h-7 text-secondary cursor-pointer'
          />
        </div>
        <div className='text-lg text-secondary ml-3'># {content.topic}</div>
      </div>
    </div>
  )
}
function StoryContentBody({ content }: { content: FeedType }) {
  return (
    <div className='w-full flex-1 flex flex-col text-center h-full px-4 overflow-y-hidden'>
      {/* 상단 텍스트 영역 - shrink-0로 크기 고정 */}
      <div className='flex flex-col mt-10 justify-center shrink-0'>
        <h1 className='text-4xl font-bold text-secondary mb-4'>
          {content.title}
        </h1>
        <p className='text-2xl text-secondary mb-6 overflow-hidden whitespace-normal overflow-ellipsis'>
          {content.question}
        </p>
      </div>
      {/* 이미지 영역 - flex-1으로 남은 공간 차지하고 min-h-0으로 줄어들 수 있게 설정 */}
      <div className='w-full flex flex-1 justify-center mb-6 min-h-0'>
        <Link
          to={content.vurl}
          target='_blank'
          style={{
            backgroundImage: `url(${
              content.vurl.includes('velog')
                ? 'https://images.velog.io/images/kim-mg/post/b6928585-e245-4e5f-b878-0bbf278e5886/velog_logo.png'
                : content.vurl.includes('tistory')
                  ? 'https://velog.velcdn.com/images%2Fsnoop2head%2Fpost%2F743a1b1a-4273-4f4f-94a5-14b8cf35a23c%2Ftistory.jpeg'
                  : 'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg'
            })`
          }}
          className='w-full bg-contain bg-center rounded-2xl aspect-square'
        ></Link>
      </div>
      {/* 하단 태그와 설명 영역 - shrink-0로 크기 고정 */}
      <div className='gap-3 shrink-0 flex-wrap flex'>
        {content.tags.map((tag) => (
          <div className='text-secondary cursor-pointer whitespace-nowrap text-center bg-background-secondary px-3 py-1 rounded-2xl'>
            <p>{tag}</p>
          </div>
        ))}
      </div>
      <div className='w-full text-start text-base text-secondary pt-4 pl-2 shrink-0 line-clamp-3'>
        {content.description}
      </div>
    </div>
  )
}

function StoryContentBottom({ content }: { content: FeedType }) {
  const user = useUserStore((s) => s.user)
  const { handlePostFeedLike } = useFeedQuery()
  const [isLiked, setIsLiked] = useState(false)
  return (
    <div className='w-full flex flex-col shrink-0 h-20 bg-gradient-to-t from-black/20 to-background-primary'>
      <div className='flex-1 flex items-center justify-between px-2 sm:px-4'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center justify-center w-10 h-10 bg-secondary rounded-full'>
            <img
              src={content.userInfo.userProfileUrl}
              alt='profile'
              className='rounded-full'
            />
          </div>
          <div className='text-secondary'>{content.userInfo.userName}</div>
        </div>
        <div className='flex items-center gap-x-4 justify-end'>
          <div
            className='flex items-end gap-x-1 text-xl cursor-pointer'
            onClick={() => {
              handlePostFeedLike(content._id)
              setIsLiked(true)
            }}
          >
            <CustomIcon
              name='HeartIcon'
              className={`w-8 h-8 ${
                content.likedUser
                  ? content.likedUser.length === 0
                    ? 'text-secondary'
                    : content.likedUser.find((u) => u === user?.userId) ||
                        isLiked
                      ? 'text-red-500 fill-red-500'
                      : 'text-secondary'
                  : 'text-secondary'
              }`}
            />
            <p className='text-secondary'>
              {content.likedUser
                ? content.likedUser.length === 0
                  ? content.likedUser.length
                  : content.likedUser.find((u) => u === user?.userId) || isLiked
                    ? 1 + content.likedUser.length
                    : content.likedUser.length
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StoryContent
