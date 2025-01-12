import { Spinner } from '@components/ui/Spinner'

import useFeedQuery from '@hooks/queries/useFeedQuery'

import FeedCard from './FeedCard'

// 사용 예시를 위한 데모 컴포넌트
const Feed = () => {
  const { feeds, isGetFeedPending } = useFeedQuery()

  return (
    <div className='w-full flex flex-col gap-4'>
      {isGetFeedPending ? (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      ) : feeds ? (
        feeds.map((item) => <FeedCard key={item._id} feed={item} />)
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <p className='text-tertiary'>피드가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export { Feed }
