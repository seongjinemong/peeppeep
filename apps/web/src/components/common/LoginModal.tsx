import { useUserStore } from '@/stores/userStore'
import { GoogleUserLoginResponse, User } from '@/types'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import useModalStore from '@stores/modalStore'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import useUserQuery from '@hooks/queries/useUserQuery'

export function LoginModal() {
  const { setUser } = useUserStore()
  const navigate = useNavigate()
  const closeModal = useModalStore((s) => s.closeModal)
  const { handlePostUser } = useUserQuery()
  return (
    <div className='w-full flex justify-center pt-20'>
      <div className='w-full max-w-4xl flex flex-col gap-4 p-4 sm:p-6 items-center'>
        <GoogleLogin
          onSuccess={(credentialResponse: CredentialResponse) => {
            console.log(credentialResponse)

            const decodedCredential: GoogleUserLoginResponse =
              credentialResponse.credential
                ? jwtDecode(credentialResponse.credential)
                : { email: '', given_name: '', picture: '', sub: '' }
            console.log(decodedCredential)

            const user: User = {
              email: decodedCredential.email || '',
              userName: decodedCredential.given_name || '',
              userId: decodedCredential.sub?.toString() || '',
              userProfileUrl: decodedCredential.picture || ''
            }

            setUser(user)
            handlePostUser(user)
            console.log(user)
            closeModal()
            navigate('/')
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
    </div>
  )
}
