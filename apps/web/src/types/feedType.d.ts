export type FeedType = {
  id: string
  userId: string
  userName: string
  title: string
  description: string
  topic: string
  tags: string[]
  question?: string
}

export type FeedProps = {
  feed: Feed
}
