import { tempStoryContent } from '@constants/temp.constant'
import useModalStore from '@stores/modalStore'

import CustomIcons from '@components/common/CustomIcons'
import CustomIcon from '@components/common/CustomIcons'
import StoryList from '@components/story/StoryList'

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
    <div className='w-full flex flex-col items-center justify-center pt-8'>
      <div className='w-full flex flex-col'>
        <div className='w-full flex flex-col gap-4 mx-auto'>
          <div className='w-full py-8 px-2 md:px-4'>
            <div className='text-2xl font-semibold flex gap-1 pl-4'>
              <div className='w-4 h-6 bg-blue-300'></div>스토리
            </div>
            <StoryList contents={tempStoryContent} />
          </div>
          <div className='w-full flex flex-col gap-4 py-16'>
            <div className='w-full flex flex-col gap-4'>
              <Feed />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleAddFeedClick}
        className='w-16 h-16 bg-blue-300 rounded-full fixed flex cursor-pointer items-center justify-center bottom-4 right-4'
      >
        <CustomIcon name='PlusIcon' className='w-11 h-11 text-white' />
      </div>
    </div>
  )
}
