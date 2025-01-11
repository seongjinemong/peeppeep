import Logo from '@assets/images/icons/Logo.svg?react'
import { Link } from 'react-router-dom'

import CustomIcon from '@components/common/CustomIcons'

import { Dropdown } from '../dropdown/Dropdown'

export function NavigationBar() {
  return (
    <header className='w-full z-50 shrink-0 fixed top-0 left-0 right-0 h-16 bg-background-primary'>
      <nav className='w-full flex items-center justify-between h-full sm:px-10 px-4'>
        <div className='flex items-center gap-5 h-full mt-1'>
          <CustomIcon name='MenuIcon' className='w-8 h-8' />
          <Link to='/' className='text-2xl font-bold flex items-end gap-2 mt-1'>
            <Logo className='w-8 h-8' /> <p className=''>Levelop</p>
          </Link>
        </div>
        <div className=''>
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
                onClick: () => {}
              }
            ]}
          />
        </div>
      </nav>
    </header>
  )
}
