import useModalStore from '@stores/modalStore'
import { useUserStore } from '@stores/userStore'
import { Link } from 'react-router-dom'

import { LoginModal } from '@components/common'
import AddLinkModal from '@components/common/AddLinkModal'
import CustomIcon from '@components/common/CustomIcons'
import { Feed } from '@components/home/Feed'
import StoryList from '@components/story/StoryList'

export function Home() {
  const openModal = useModalStore((s) => s.openModal)
  const user = useUserStore((s) => s.user)
  const handleAddFeedClick = () => {
    if (!user) {
      openModal({
        children: <LoginModal />,
        title: '로그인',
        className: 'max-w-lg mx-auto w-full h-[40vh]'
      })
    } else
      // openModal({
      //   children: <AddModal />,
      //   title: '게시글 추가하기',
      //   className: 'max-w-3xl mx-auto w-full h-[80vh]'
      // })
      openModal({
        children: <AddLinkModal />,
        title: '링크 추가하기',
        className: 'max-w-lg mx-auto w-full h-[40vh]'
      })
  }

  return (
    <div className='w-full flex flex-col items-center justify-center px-2 pt-20 md:px-4'>
      <div className='w-full flex flex-col'>
        <div className='w-full flex flex-col gap-4 mx-auto'>
          <div className='w-full max-w-7xl mx-auto'>
            <div className='flex gap-4 py-4 items-end'>
              {/* <div className='w-8 h-10 bg-blue-300'></div> */}
              <h3 className='text-3xl font-semibold'>스토리</h3>
              <p className='text-tertiary'>
                # 따끈따끈한 최신 블로그들을 확인해보세요
              </p>
            </div>
            <StoryList />
          </div>
          <div className='w-full h-px bg-slate-200' />
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
