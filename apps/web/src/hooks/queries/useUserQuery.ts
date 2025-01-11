import { useMutation } from '@tanstack/react-query'

import { postUserApi, UserRequsetType } from '@apis/userApi'

const usePostUser = () => {
  return useMutation({
    mutationFn: (requset: UserRequsetType) => postUserApi(requset)
  })
}
const useUserQuery = () => {
  const { mutate: postUser } = usePostUser()
  const handlePostUser = (requset: any) => {
    const data = {
      userId: requset.userId,
      email: requset.email,
      userProfileUrl: requset.userProfileURL,
      userName: requset.userName
    }
    postUser(data)
  }
  return { handlePostUser }
}
export default useUserQuery
