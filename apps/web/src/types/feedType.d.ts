export interface CommentType {
  _id: string
  userId: string
  content: string
  likedUser: string[]
  created_at: string
}

export interface FeedType {
  id: string
  userId: string
  userName: string
  description: string
  title: string
  topic: string
  likedUser: string[]
  tags: string[]
  question: string
  image_url: string
  created_at: string
  updated_at: string
  comment: CommentType[]
}
