export interface CommentType {
  _id: string
  userId: string
  userInfo: UserInfo
  content: string
  likedUser: string[]
  created_at: { $date: string }
}

export interface FeedType {
  _id: string
  userId: string
  userInfo: UserInfo
  description: string
  title: string
  topic: string
  likedUser: string[]
  tags: string[]
  question: string
  imageUrl: string
  created_at: { $date: string }
  vurl: string
  updated_at: { $date: string }
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
