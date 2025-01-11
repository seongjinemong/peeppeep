import { StoryContentType } from '@/types'
import { Link, useNavigate } from 'react-router-dom'

import CustomIcons from '@components/common/CustomIcons'

function StoryContent({ content }: { content: StoryContentType }) {
  return (
    <div className='w-full flex shrink-0 h-[calc(100vh-4rem)] pb-3 pt-1 bg-background-gray snap-start snap-always'>
      <div className='w-full h-full flex flex-col rounded-2xl overflow-hidden bg-background-primary'>
        <StoryContentHeader content={content} />
        <StoryContentBody content={content} />
        <StoryContentBottom content={content} />
      </div>
    </div>
  )
}

function StoryContentHeader({ content }: { content: StoryContentType }) {
  const navigate = useNavigate()
  return (
    <div className='w-full flex justify-between items-end px-4 h-10 shrink-0'>
      <div className='flex gap-2'>
        <CustomIcons.ChevronBackIcon
          className='w-7 h-7 text-secondary cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <div className='text-lg text-secondary ml-3'># {content.topic}</div>
      </div>
    </div>
  )
}
function StoryContentBody({ content }: { content: StoryContentType }) {
  return (
    <div className='w-full flex-1 flex flex-col text-center h-full px-4 overflow-y-hidden'>
      {/* 상단 텍스트 영역 - shrink-0로 크기 고정 */}
      <div className='flex flex-col mt-10 justify-center shrink-0'>
        <h1 className='text-4xl font-semibold text-secondary mb-4'>
          {content.title}
        </h1>
        <p className='text-2xl text-secondary mb-6'>{content.question}</p>
      </div>
      {/* 이미지 영역 - flex-1으로 남은 공간 차지하고 min-h-0으로 줄어들 수 있게 설정 */}
      <div className='w-full flex flex-1 justify-center mb-6 min-h-0'>
        <div
          style={{ backgroundImage: `url(${content.imageUrl})` }}
          className='w-full h-full bg-cover bg-center rounded-2xl'
        ></div>
      </div>
      {/* 하단 태그와 설명 영역 - shrink-0로 크기 고정 */}
      <div className='flex gap-x-3 shrink-0 overflow-x-auto'>
        {content.tags.map((tag) => (
          <div className='text-secondary cursor-pointer text-center bg-background-secondary px-3 py-1 rounded-2xl'>
            <Link to={`/${tag}`}>{tag}</Link>
          </div>
        ))}
      </div>
      <div className='w-full text-start text-base text-secondary pt-4 pl-2 shrink-0'>
        {content.description}
      </div>
    </div>
  )
}

function StoryContentBottom({ content }: { content: StoryContentType }) {
  return (
    <div className='w-full flex flex-col shrink-0 h-20 bg-gradient-to-t from-black/20 to-background-primary'>
      <div className='flex-1 flex items-center justify-between px-2 sm:px-4'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center justify-center w-10 h-10 bg-secondary rounded-full'>
            <CustomIcons.UserIcon className='w-8 h-8 text-background-primary' />
          </div>
          {content.userName}
        </div>
      </div>
      <div className='w-full h-1 bg-red-500'></div>
    </div>
  )
}
export default StoryContent
