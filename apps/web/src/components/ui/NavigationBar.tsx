import { Link } from 'react-router-dom'

import CustomIcons from '@components/common/CustomIcons'

import { Dropdown } from './dropdown/Dropdown'

export function NavigationBar() {
  return (
    <header className='w-full h-16 bg-background-primary shadow-sm'>
      <nav className='max-w-5xl mx-auto w-full flex items-center justify-between h-full'>
        <div className='flex items-center gap-4'>
          <Link to='/' className='text-2xl font-bold'>
            <div>Logo</div>
          </Link>
        </div>
        <div className=''>
          <Dropdown
            trigger={
              <div className='bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'>
                <CustomIcons.UserIcon className='w-6 h-6 bg-background-primary text-background-primary text-white' />
              </div>
            }
            items={[
              {
                label: '프로필',
                onClick: () => {}
              },
              {
                label: (
                  <div className='flex items-center gap-2'>
                    로그아웃
                    <CustomIcons.LogoutIcon className='w-6 h-6 text-primary' />
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
