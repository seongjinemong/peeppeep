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
  imageUrl: string
  created_at: string
  vurl: string
  updated_at: string
  comment: CommentType[]
}

export interface AnalyzeFormType
  extends Pick<FeedType, 'description' | 'tags' | 'title' | 'topic'> {}

export interface InputFormData {
  userId: string
  link: string
  title: string
  description: string
  tags: string[]
  question: string
  topic: string
}
