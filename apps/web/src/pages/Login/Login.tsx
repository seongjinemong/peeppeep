import { GoogleLogin } from '@react-oauth/google'

export function Login() {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-4xl flex flex-col gap-4 p-4 sm:p-6 items-center'>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
            const decodedCredential = atob(credentialResponse.credential)
            console.log(decodedCredential)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
    </div>
  )
}
