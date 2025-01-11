import { Feed as FeedType } from '@/types'
import { useState } from 'react'

export function Feed({ data }: { data: FeedType }) {
  const [answer, setAnswer] = useState('')
  const [submitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    console.log(answer)
    setIsSubmitting(false)
  }

  return (
    <div className='w-full flex flex-col gap-4 rounded-md bg-white p-4 sm:p-6'>
      <div className='flex flex-row items-center gap-2'>
        <div className='w-6 h-6 rounded-full bg-gray-400'></div>
        <div className='text-xl'>{data.userName}</div>
      </div>

      <div className='flex flex-row items-center gap-2'>
        <div className='text-gray-500 font-bold text-xl'>{data.title}</div>
        {data.tags.map((tag) => (
          <div className='underline'>{'#' + tag}</div>
        ))}
      </div>

      <div className='text-gray-500'>{data.description}</div>
      {data.question && <div className='text-gray-500'>{data.question}</div>}

      <div className='flex flex-row items-center gap-2'>
        <input
          type='text'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder='Your Answer?'
          className='w-full rounded-md border border-gray-300 p-2'
        />
        <button
          className='bg-blue-500 text-white rounded-md p-2'
          type='submit'
          onClick={handleSubmit}
          disabled={submitting}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
