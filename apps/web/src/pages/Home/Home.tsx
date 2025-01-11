import { Feed as FeedType } from '@/types'

import { AddButton, Feed } from './components'

const sampleData: FeedType[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sample 1',
    title: 'Title 1',
    description:
      'This is a longer description for Sample 1. It spans across multiple lines and provides more context about the topic. It is approximately 100 words in length.',
    topic: 'Topic 1',
    tags: ['tag1', 'tag2', 'tag3'],
    question: 'Question 1'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sample 2',
    title: 'Title 2',
    description:
      'This is a longer description for Sample 2. It spans across multiple lines and provides more context about the topic. It is approximately 100 words in length.',
    topic: 'Topic 2',
    tags: ['tag4', 'tag5', 'tag6'],
    question: 'Question 2'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Sample 3',
    title: 'Title 3',
    description:
      'This is a longer description for Sample 3. It spans across multiple lines and provides more context about the topic. It is approximately 100 words in length.',
    topic: 'Topic 3',
    tags: ['tag7', 'tag8', 'tag9'],
    question: 'Question 3'
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sample 4',
    title: 'Title 4',
    description:
      'This is a longer description for Sample 4. It spans across multiple lines and provides more context about the topic. It is approximately 100 words in length.',
    topic: 'Topic 4',
    tags: ['tag10', 'tag11', 'tag12'],
    question: 'Question 4'
  },
  {
    id: '5',
    userId: '5',
    userName: 'Sample 5',
    title: 'Title 5',
    description:
      'This is a longer description for Sample 5. It spans across multiple lines and provides more context about the topic. It is approximately 100 words in length.',
    topic: 'Topic 5',
    tags: ['tag13', 'tag14', 'tag15'],
    question: 'Question 5'
  }
]

export function Home() {
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-full max-w-4xl flex flex-col gap-4'>
        {sampleData.map((item) => (
          <Feed key={item.userId} data={item} />
        ))}
      </div>
      <AddButton />
    </div>
  )
}
