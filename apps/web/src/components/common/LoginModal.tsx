import { useUserStore } from '@/stores/userStore'
import { GoogleUserLoginResponse, User } from '@/types'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import useModalStore from '@stores/modalStore'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export function LoginModal() {
  const { setUser } = useUserStore()
  const navigate = useNavigate()
  const closeModal = useModalStore((s) => s.closeModal)
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
              userProfileURL: decodedCredential.picture || ''
            }

            setUser(user)

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
