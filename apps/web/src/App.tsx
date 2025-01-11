import { Route, Routes } from 'react-router-dom'

import { Add } from '@pages/Add'
import { Home } from '@pages/Home'
import { Story } from '@pages/Story'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Add />} />
        <Route path='/story' element={<Story />} />
        <Route path='/profile' element={<div>Profile</div>} />
      </Routes>
    </>
  )
}

export default App
