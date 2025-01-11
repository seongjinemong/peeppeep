interface StoryContentType {
  _id: string
  userId: string
  userName: string
  description: string
  title: string
  topic: string
  tags: string[]
  question: string
  imageUrl: string
  vurl: string
}

export type { StoryContentType }
