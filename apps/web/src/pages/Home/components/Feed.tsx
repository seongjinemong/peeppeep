import { Spinner } from '@components/ui/Spinner'

import useFeedQuery from '@hooks/queries/useFeedQuery'

import FeedCard from './FeedCard'

// 사용 예시를 위한 데모 컴포넌트
const Feed = ({ selectedTag }: { selectedTag: string }) => {
  const { feeds, isPending } = useFeedQuery()

  return (
    <div className='w-full flex flex-col gap-4'>
      {isPending ? (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        feeds.map((item) => <FeedCard key={item.id} feed={item} />)
      )}
    </div>
  )
}

export { Feed }
