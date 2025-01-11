import { tempStoryContent } from '@constants/temp.constant'
import useModalStore from '@stores/modalStore'
import { useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'
import CustomIcon from '@components/common/CustomIcons'
import StoryList from '@components/story/StoryList'
import { Chip } from '@components/ui/chip/Chips'

import { Add } from '@pages/Add'

import { Feed } from './components'

export function Home() {
  const openModal = useModalStore((s) => s.openModal)
  const handleAddFeedClick = () => {
    openModal({
      children: <Add />,
      title: '게시글 추가하기',
      className: 'max-w-3xl mx-auto w-full h-[80vh]'
    })
  }
  const TagElements = [
    '전체',
    '개발 . 프로그래밍',
    '게임 개발',
    '데이터 사이언스',
    '인공지능',
    '보안 . 네트워크'
  ]
  const [selectedTag, setSelectedTag] = useState<string>('전체')

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }
  return (
    <>
      <div className='flex gap-2 w-full fixed top-16 left-64 z-50 py-4 bg-background-primary shadow-inset-b'>
        <div className='flex gap-2 px-4'>
          {TagElements.map((tag) => (
            <Chip
              size='sm'
              variant='default'
              selected={tag === selectedTag}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Chip>
          ))}
        </div>
      </div>
      <div className='w-full flex flex-col items-center justify-center px-2 md:px-4'>
        <div className='w-full flex flex-col'>
          <div className='w-full flex flex-col gap-4 mx-auto'>
            <div className='w-full'>
              <div className='flex gap-4 pl-4 py-4 items-end'>
                {/* <div className='w-8 h-10 bg-blue-300'></div> */}
                <h3 className='text-3xl font-semibold'>스토리</h3>
                <p className='text-tertiary'>
                  # 따끈따끈한 최신 블로그들을 확인해보세요
                </p>
              </div>
              <StoryList contents={tempStoryContent} />
            </div>
            <div className='w-full flex flex-col gap-4 py-16'>
              <div className='w-full flex flex-col gap-4'>
                <Feed selectedTag={selectedTag} />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={handleAddFeedClick}
          className='w-16 h-16 bg-blue-300 rounded-full fixed flex cursor-pointer items-center justify-center bottom-10 right-10'
        >
          <CustomIcon name='PlusIcon' className='w-11 h-11 text-white' />
        </div>
      </div>
    </>
  )
}
