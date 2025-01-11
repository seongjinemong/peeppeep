import { GoogleOAuthProvider } from '@react-oauth/google'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import CustomIcon, { IconName } from '@components/common/CustomIcons'
import { NavigationBar } from '@components/ui/NavigationBar'

import { Add } from '@pages/Add'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { Story } from '@pages/Story'

import { ModalPortal } from '@utils/helper'

interface leftSideElementProps {
  name: IconName
  to?: string
  title: string
  children?: {
    name: IconName
    to: string
    title: string
  }[]
}

interface NavItemProps {
  item: leftSideElementProps
  isActive: boolean
  onClick: () => void
  isOpen: boolean
}

function NavItem({ item, isActive, onClick, isOpen }: NavItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const path = useLocation().pathname
  if (path.startsWith('/settings/prompt')) {
    console.log('path', path)
  }
  return (
    <div>
      <div
        onClick={onClick}
        className={`${
          isActive &&
          'bg-gradient-to-r from-cyan-300/80 to-blue-200/80 text-black font-semibold'
        } mb-1.5 flex items-center gap-4 py-3 px-5 duration-150 cursor-pointer`}
      >
        <CustomIcon className='w-6 h-6' name={item.name} />
        <div className='text-base flex-1'>{item.title}</div>
        {hasChildren && (
          <div className='text-gray-500'>
            {isOpen ? (
              <CustomIcon
                name='ChevronBackIcon'
                className='w-6 h-6 rotate-180'
              />
            ) : (
              <CustomIcon
                name='ChevronBackIcon'
                className='w-6 h-6 rotate-90'
              />
            )}
          </div>
        )}
      </div>

      <div
        className={`ml-8 transition-[max-height] duration-500 ${isOpen && hasChildren ? 'max-h-fit' : 'overflow-hidden max-h-0'}`}
      >
        {item.children?.map((child) => (
          <Link
            key={child.name}
            to={child.to}
            className={`${
              location.pathname === child.to &&
              'bg-gradient-to-r from-cyan-300/80 to-blue-200/80 text-black font-semibold'
            } mb-1.5 flex items-center gap-4 py-2 px-4 duration-150 rounded-md`}
          >
            <CustomIcon name={child.name} />
            <div className='text-sm'>{child.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const leftSideElements: leftSideElementProps[] = [
  { name: 'HomeIcon', to: '/', title: '홈' },
  { name: 'HomeIcon', to: '/story', title: '스토리' },
  { name: 'HomeIcon', to: '/feed', title: '피드' }
]
const leftSideBottomElements: leftSideElementProps[] = [
  {
    name: 'SettingsIcon',
    title: '설정'
  },
  {
    name: 'LogoutIcon',
    title: '로그아웃'
  }
]
function LeftSidebar() {
  const location = useLocation()
  const [openItems, setOpenItems] = useState<string[]>([])
  const navigate = useNavigate()

  const toggleItem = (itemName: string) => {
    setOpenItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    )
  }

  const handleItemClick = (item: (typeof leftSideElements)[0]) => {
    if (item.children) {
      toggleItem(item.name)
    } else if (item.to) {
      navigate(item.to)
    }
  }

  return (
    <div className='md:flex h-screen flex-col w-80 border-r bg-background-primary border-border'>
      <div className='flex pt-16 h-full'>
        <div className='flex flex-col flex-1 justify-between h-full'>
          <div>
            {leftSideElements.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={item.to ? location.pathname === item.to : false}
                onClick={() => handleItemClick(item)}
                isOpen={openItems.includes(item.name)}
              />
            ))}
          </div>
          <div>
            {leftSideBottomElements.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={false}
                onClick={() => handleItemClick(item)}
                isOpen={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <GoogleOAuthProvider clientId='638172052069-mn73rt77rrbifi1nerhauor4goti4rqe.apps.googleusercontent.com'>
      <ToastContainer position='bottom-right' />
      <div className='flex'>
        <LeftSidebar />
        <div className='pt-16 h-screen w-full overflow-y-auto bg-background-gray'>
          <NavigationBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/add' element={<Add />} />
            <Route path='/story' element={<Story />} />
            <Route path='/profile' element={<div>Profile</div>} />
          </Routes>
        </div>
      </div>
      <ModalPortal />
    </GoogleOAuthProvider>
  )
}

export default App
