import { AnalyzeFormType, FeedType } from '@/types/feedType'
import { tempStoryContent } from '@constants/temp.constant'
import useModalStore from '@stores/modalStore'
import { useState } from 'react'

import { postLinkApi } from '@apis/feedApi'

import CustomIcon from '@components/common/CustomIcons'
import { AddModal } from '@components/home/AddModal'
import { Feed } from '@components/home/Feed'
import StoryList from '@components/story/StoryList'
import { Spinner } from '@components/ui/Spinner'
import { Button } from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'

import useFeedQuery from '@hooks/queries/useFeedQuery'

const AddLinkModal = () => {
  const [link, setLink] = useState('')

  const openModal = useModalStore((s) => s.openModal)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddLink = async () => {
    try {
      setIsLoading(true)
      const res = await postLinkApi(link)
      console.log(res)

      // res 데이터를 직접 사용
      openModal({
        children: (
          <AddModal
            isPostLinkPending={isLoading}
            url={link}
            analyzeForm={
              res || {
                title: '',
                description: '',
                tags: [],
                topic: ''
              }
            }
          />
        ),
        title: '게시글 추가하기',
        className: 'max-w-3xl mx-auto w-full h-[80vh]'
      })
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex flex-col h-full justify-center items-center w-full gap-1'>
        <Spinner />
      </div>
    )
  }
  return (
    <div className='flex flex-col h-full justify-between items-start pt-16 md:pt-20 w-full gap-1'>
      <div className='w-full'>
        <Input
          label='링크'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <p className='text-sm pl-4 pt-2 text-gray-500'>
          벨로그 or 블로그 링크를 입력해주세요.
        </p>
      </div>

      <div className='flex pt-4 justify-between w-fit mx-auto gap-2 md:gap-4'>
        <Button variant='outline' size='md'>
          취소
        </Button>
        <Button onClick={handleAddLink} variant='filled' size='md'>
          추가
        </Button>
      </div>
    </div>
  )
}

export function Home() {
  const openModal = useModalStore((s) => s.openModal)
  const handleAddFeedClick = () => {
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
