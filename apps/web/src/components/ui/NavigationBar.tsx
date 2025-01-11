import { Link } from 'react-router-dom'

import CustomIcons from '@components/common/CustomIcons'

import { Dropdown } from './dropdown/Dropdown'

export function NavigationBar() {
  return (
    <header className='w-full shrink-0  h-16 bg-background-primary shadow-sm'>
      <nav className='max-w-4xl mx-auto w-full flex items-center justify-between h-full sm:px-4 px-6'>
        <div className='flex items-center gap-4'>
          <Link to='/' className='text-2xl font-bold'>
            <div>Logo</div>
          </Link>
        </div>
        <div className=''>
          <Dropdown
            width='w-48'
            trigger={
              <div className='bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'>
                <CustomIcons.UserIcon className='w-6 h-6 text-background-primary' />
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
