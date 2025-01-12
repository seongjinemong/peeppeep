import useModalStore from '@stores/modalStore'
import { useState } from 'react'

import { postLinkApi } from '@apis/feedApi'

import { AddModal } from '@components/home/AddModal'
import { Spinner } from '@components/ui/Spinner'
import { Button } from '@components/ui/button/Button'
import Input from '@components/ui/input/Input'

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
export default AddLinkModal
