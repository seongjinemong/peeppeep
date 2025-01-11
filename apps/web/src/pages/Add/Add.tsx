import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function Add() {
  const [formVisible, setFormVisible] = useState(false)
  const [tags, setTags] = useState(['tag1', 'tag2', 'tag3'])
  const navigate = useNavigate()

  const handleSubmitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const linkInput = document.getElementById('link') as HTMLInputElement
    const linkValue = linkInput.value.trim()
    if (
      !linkValue ||
      !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w.-](?:\/[\w.-]*)*$/i.test(
        linkValue
      )
    ) {
      toast.error('Please enter a valid URL.')
    } else {
      setFormVisible(true)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-4xl flex flex-col gap-4 p-4 sm:p-6'>
        <form onSubmit={(e) => handleSubmitLink(e)}>
          <div className='mb-4'>
            <label
              htmlFor='link'
              className='block text-sm font-medium text-gray-700'
            >
              Link
            </label>
            <input
              type='url'
              name='link'
              id='link'
              className='mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='https://example.com'
            />
          </div>
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Submit
          </button>
        </form>
        {formVisible && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mt-4'>
              <div className='mb-4'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  className='mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='summary'
                  className='block text-sm font-medium text-gray-700'
                >
                  Summary
                </label>
                <textarea
                  name='summary'
                  id='summary'
                  rows={3}
                  className='mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='tags'
                  className='block text-sm font-medium text-gray-700'
                >
                  Tags
                </label>
                <div className='flex flex-wrap'>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className='m-1 py-2 px-4 bg-gray-200 rounded-full text-gray-700 cursor-pointer'
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <input
                  type='text'
                  name='tags'
                  id='tags'
                  className='mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Comma separated'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value
                      if (value) {
                        const processedValue = value
                          .split(',')
                          .map((tag) => tag.trim().replace(/\s+/g, '_'))
                        const newTags = processedValue.filter(
                          (tag) => !tags.includes(tag)
                        )
                        setTags([...tags, ...newTags])
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }
                  }}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='question'
                  className='block text-sm font-medium text-gray-700'
                >
                  Question
                </label>
                <textarea
                  name='question'
                  id='question'
                  rows={3}
                  className='mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Submit
              </button>
            </div>
          </form>
        )}
        <button
          type='button'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
