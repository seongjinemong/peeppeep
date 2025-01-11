import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { NavigationBar } from '@components/ui/NavigationBar'

import { Add } from '@pages/Add'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { Story } from '@pages/Story'

import { ModalPortal } from '@utils/helper'

function App() {
  return (
    <GoogleOAuthProvider clientId='638172052069-mn73rt77rrbifi1nerhauor4goti4rqe.apps.googleusercontent.com'>
      <ToastContainer position='bottom-right' />
      <div className='pt-16 h-screen overflow-y-auto bg-background-gray'>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add' element={<Add />} />
          <Route path='/story' element={<Story />} />
          <Route path='/profile' element={<div>Profile</div>} />
        </Routes>
      </div>
      <ModalPortal />
    </GoogleOAuthProvider>
  )
}

export default App
