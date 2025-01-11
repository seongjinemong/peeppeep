export type User = {
  email: string
  userName: string
  userId: string
  userProfileURL: string
}

export type GoogleUserLoginResponse = {
  email: string
  given_name: string
  picture: string
  sub: string
}
