import { FeedType } from '@/types'
import { create } from 'zustand'

interface StoryStore {
  story: FeedType[]
  setStory: (story: FeedType[]) => void
  clearStory: () => void
}

const useStoryStore = create<StoryStore>((set) => ({
  story: [],
  setStory: (story: FeedType[]) => set({ story }),
  clearStory: () => set({ story: [] })
}))

export default useStoryStore
