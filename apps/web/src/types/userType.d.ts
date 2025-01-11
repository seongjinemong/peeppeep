export type User = {
  email: string
  userName: string
  userId: string
  userProfileUrl: string
}

export type UserInfo = Omit<User, 'email'>
export type GoogleUserLoginResponse = {
  email: string
  given_name: string
  picture: string
  sub: string
}
