import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { cn } from '../../../utils'

export interface MenuItemType {
  id: string | number
  content: React.ReactNode
}

interface MenuContentProps {
  header?: React.ReactNode
  children?: React.ReactNode
  items?: MenuItemType[]
  className?: string
  width?: string
  align?: 'left' | 'right'
}

const MenuContent = ({
  header,
  children,
  items,
  className,
  width = 'w-80',
  align = 'right'
}: MenuContentProps) => (
  <Transition
    as={Fragment}
    enter='transition ease-out duration-200'
    enterFrom='opacity-0 scale-95'
    enterTo='opacity-100 scale-100'
    leave='transition ease-in duration-150'
    leaveFrom='opacity-100 scale-100'
    leaveTo='opacity-0 scale-95'
  >
    <Menu.Items
      className={cn(
        'absolute top-0 z-50',
        align === 'right'
          ? 'right-0 translate-x-full'
          : 'left-0 -translate-x-full',
        width,
        'rounded-xl bg-background-primary shadow-lg ring-1 ring-black/5 focus:outline-none border border-border',
        className
      )}
    >
      <div className='py-1'>
        {header && (
          <div className='px-4 py-3 border-b border-border'>{header}</div>
        )}
        <div className='overflow-y-auto'>
          {children ||
            (items &&
              items.map((item) => (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <div
                      className={cn(
                        'px-4 py-3 cursor-pointer',
                        active && 'bg-background-secondary'
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Menu.Item>
              )))}
        </div>
      </div>
    </Menu.Items>
  </Transition>
)

export interface CustomMenuProps {
  trigger: React.ReactNode
  header?: React.ReactNode
  items?: MenuItemType[]
  children?: React.ReactNode
  className?: string
  menuClassName?: string
  width?: string
  align?: 'left' | 'right'
}

function CustomMenu({
  trigger,
  header,
  items,
  children,
  className,
  menuClassName,
  width,
  align
}: CustomMenuProps) {
  return (
    <Menu as='div' className={cn('relative', className)}>
      <Menu.Button as='div'>{trigger}</Menu.Button>
      <MenuContent
        header={header}
        items={items}
        className={menuClassName}
        width={width}
        align={align}
      >
        {children}
      </MenuContent>
    </Menu>
  )
}

export { Menu, CustomMenu }
