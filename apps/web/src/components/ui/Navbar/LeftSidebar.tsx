import { leftSideElements } from '@constants/navItems.constant'
import { leftSideBottomElements } from '@constants/navItems.constant'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import NavItem from './NavItem'

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
    <div className='md:flex h-screen flex-col fixed left-0 top-0 w-64  shrink-0 border-r bg-background-primary border-border'>
      <div className='flex pt-[4.8rem] h-full'>
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

export default LeftSidebar
