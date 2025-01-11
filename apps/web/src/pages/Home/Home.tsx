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
  return (
    <div className='w-full flex flex-col items-center justify-center px-2 pt-10 md:px-4'>
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
          <div className='w-full flex flex-col gap-4 py-8'>
            <div className='w-full flex flex-col gap-4'>
              <Feed />
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
  )
}
