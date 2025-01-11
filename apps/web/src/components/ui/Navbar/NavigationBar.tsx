import Logo from '@assets/images/icons/Logo.svg?react'
import useModalStore from '@stores/modalStore'
import { useState } from 'react'

import { LoginModal } from '@components/common'
import CustomIcon from '@components/common/CustomIcons'

import { useAuth } from '@hooks/useAuth'

import { Button } from '../button/Button'
import { Chip } from '../chip/Chips'
import { Dropdown } from '../dropdown/Dropdown'

export function NavigationBar() {
  const TagElements = [
    '전체',
    '개발 . 프로그래밍',
    '게임 개발',
    '데이터 사이언스',
    '인공지능',
    '보안 . 네트워크'
  ]
  const [selectedTag, setSelectedTag] = useState<string>('전체')

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }
  const { isAuth, handleLogout } = useAuth()
  const { openModal } = useModalStore()
  const openLoginModal = () => {
    openModal({
      children: <LoginModal />,
      title: '로그인',
      className: 'max-w-lg mx-auto w-full h-[40vh]'
    })
  }

  return (
    <header className='w-full z-50 shrink-0 fixed top-0 left-0 right-0 h-16 bg-background-primary'>
      <nav className='w-full flex items-center justify-between h-full sm:px-10 px-4'>
        <div className='flex items-center gap-5 h-full mt-1'>
          <CustomIcon name='MenuIcon' className='w-8 h-8' />
          <div
            onClick={() => (window.location.href = '/')}
            className='text-2xl font-bold flex items-end gap-2 mt-1'
          >
            <Logo className='w-8 h-8' /> <p className=''>Levelop</p>
          </div>
        </div>
        <div className='w-1/2 flex items-center gap-2'>
          <input
            type='text'
            className='w-full h-full border border-background-secondary shadow-sm outline-none rounded-full px-4 py-3'
            placeholder='검색'
          />
          <CustomIcon name='SearchIcon' className='w-6 h-6' />
        </div>
        <div className=''>
          {isAuth ? (
            <Dropdown
              width='w-48'
              trigger={
                <div className='bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'>
                  <CustomIcon
                    name='UserIcon'
                    className='w-6 h-6 text-background-primary'
                  />
                </div>
              }
              items={[
                {
                  label: <div className='text-base'>프로필</div>,
                  onClick: () => {}
                },
                {
                  label: (
                    <div className='flex items-center gap-2 justify-between w-full text-base'>
                      로그아웃
                      <CustomIcon
                        name='LogoutIcon'
                        className='w-6 h-6 text-primary'
                      />
                    </div>
                  ),
                  onClick: () => {
                    handleLogout()
                  }
                }
              ]}
            />
          ) : (
            <div>
              <Button variant='filled' onClick={openLoginModal}>
                로그인
              </Button>
            </div>
          )}
        </div>
      </nav>
      {location.pathname === '/' && (
        <div className='flex gap-2 w-full absolute top-16 left-64 z-50 py-4 bg-background-primary shadow-inset-b'>
          <div className='flex gap-2 px-4'>
            {TagElements.map((tag) => (
              <Chip
                size='sm'
                variant='default'
                selected={tag === selectedTag}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
