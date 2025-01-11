import { leftSideElementProps } from '@/types/sidebarType'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import CustomIcon from '@components/common/CustomIcons'

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
    <div className='flex flex-col px-1'>
      <div
        onClick={onClick}
        className={`${
          isActive &&
          'bg-background-secondary rounded-md text-black font-semibold'
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
              path === child.to &&
              'bg-background-secondary text-black font-semibold'
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

export default NavItem
