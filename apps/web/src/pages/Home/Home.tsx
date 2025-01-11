import { FeedProps, FeedType } from '@/types'
import { tempStoryContent } from '@constants/temp.constant'
import useModalStore from '@stores/modalStore'

import CustomIcons from '@components/common/CustomIcons'
import StoryList from '@components/story/StoryList'

import { Add } from '@pages/Add'

import { AddButton, Feed } from './components'

const sampleFeed: FeedType[] = [
  {
    id: '1',
    userId: 'user123',
    userName: '김개발',
    title: 'React와 TypeScript 사용 팁',
    description:
      'React와 TypeScript를 함께 사용할 때 알아두면 좋은 팁들을 공유합니다. 특히 타입 추론과 제네릭 활용에 대해 이야기해보고자 합니다.',
    topic: '개발',
    tags: ['React', 'TypeScript', '웹개발', '프론트엔드'],
    question:
      '여러분들은 TypeScript로 개발할 때 어떤 점을 중요하게 생각하시나요?'
  },
  {
    id: '2',
    userId: 'user123',
    userName: '김개발',
    title: 'React와 TypeScript 사용 팁',
    description:
      'React와 TypeScript를 함께 사용할 때 알아두면 좋은 팁들을 공유합니다.',
    topic: '개발',
    tags: ['React', 'TypeScript', '웹개발', '프론트엔드']
  }
]
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
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col'>
        <div className='w-full flex flex-col gap-4 max-w-4xl mx-auto'>
          <div className='w-full py-8 px-2 bg-black/20 rounded-2xl'>
            <StoryList contents={tempStoryContent} />
          </div>
          <div className='w-full flex flex-col gap-4 py-16'>
            <div className='w-full flex flex-col gap-4'>
              <Feed sampleFeed={sampleFeed} />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleAddFeedClick}
        className='w-16 h-16 bg-blue-300 rounded-full fixed flex cursor-pointer items-center justify-center bottom-4 right-4'
      >
        <CustomIcons.PlusIcon className='w-11 h-11 text-white' />
      </div>
    </div>
  )
}
