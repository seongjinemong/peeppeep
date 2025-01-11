import { FeedType } from '@/types'
import useModalStore from '@stores/modalStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@components/ui/button/Button'
import { Chip } from '@components/ui/chip/Chips'
import Input from '@components/ui/input/Input'
// Updated import
import { CustomPopover } from '@components/ui/popover'
import { Textarea } from '@components/ui/textarea'

interface FormData {
  link: string
  title: string
  summary: string
  tags: string[]
  question: string
}

export function AddModal({ analyzeForm }: { analyzeForm: any }) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    link: '',
    title: '',
    summary: '',
    tags: ['예시태그1', '예시태그2', '예시태그3'],
    question: ''
  })

  const handleFormDataChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !formData.link ||
      !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w.-](?:\/[\w.-]*)*$/i.test(
        formData.link
      )
    ) {
      toast.error('올바른 URL을 입력해주세요.')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
  }

  const { closeModal } = useModalStore()

  return (
    <div className='h-full w-full pt-4'>
      <div className='h-full w-full'>
        <form onSubmit={handleSubmit} className='space-y-6 h-full'>
          <div className='flex flex-col gap-3 h-full'>
            <div className='flex-1 flex-col space-y-3'>
              <Input
                type='url'
                name='link'
                id='link'
                label='링크 주소'
                placeholder='https://example.com'
                value={formData.link}
                onChange={(e) => handleFormDataChange('link', e.target.value)}
                required
              />
              <div className='space-y-2'>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  label='제목'
                  placeholder='콘텐츠의 제목을 입력해주세요'
                  value={formData.title}
                  onChange={(e) =>
                    handleFormDataChange('title', e.target.value)
                  }
                  required
                />

                <Textarea
                  name='summary'
                  id='summary'
                  placeholder='콘텐츠의 주요 내용을 요약해주세요'
                  className='h-32 resize-none'
                  value={formData.summary}
                  onChange={(e) =>
                    handleFormDataChange('summary', e.target.value)
                  }
                />

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-3'>
                    태그
                  </label>
                  <div className='flex gap-2 items-center'>
                    {formData.tags.map((tag) => (
                      <Chip
                        key={tag}
                        variant='outlined'
                        size='sm'
                        onClick={() => handleFormDataChange('tags', tag)}
                      >
                        {tag}
                      </Chip>
                    ))}
                    <CustomPopover
                      trigger={
                        <Chip
                          variant='outlined'
                          size='sm'
                          className='cursor-pointer w-8 h-8'
                        >
                          +
                        </Chip>
                      }
                      position='top'
                      className='-top-20 left-10'
                      header={<div>태그 추가</div>}
                    />
                  </div>
                </div>

                <Input
                  name='question'
                  id='question'
                  label='질문'
                  value={formData.question}
                  onChange={(e) =>
                    handleFormDataChange('question', e.target.value)
                  }
                />
              </div>
            </div>

            <div className='flex gap-3 pt-4'>
              <Button variant='outline' size='xl' onClick={closeModal}>
                취소
              </Button>
              <Button type='submit' variant='filled' size='xl'>
                등록하기
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
