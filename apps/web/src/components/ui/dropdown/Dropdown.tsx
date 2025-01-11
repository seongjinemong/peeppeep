import { Menu, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface DropdownProps {
  trigger: ReactNode
  items: {
    icon?: ReactNode
    label: ReactNode | string
    onClick: () => void
    className?: string
  }[]
  position?: 'right' | 'left'
  width?: 'w-32' | 'w-40' | 'w-48' | 'w-56' | 'w-64' | 'w-80' | 'w-96'
  header?: ReactNode
  footer?: ReactNode
}

export function Dropdown({
  trigger,
  items,
  position = 'right',
  width = 'w-56',
  header,
  footer
}: DropdownProps): ReactNode {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button as={Fragment}>{trigger}</Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={`absolute z-50 ${position}-0 mt-2 ${width} origin-top-${position} rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}
        >
          {header && (
            <div className='px-4 py-3 border-b border-gray-100'>{header}</div>
          )}

          <div className='px-1 py-1'>
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {() => (
                  <button
                    className={`group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm ${item.className}`}
                    onClick={item.onClick}
                  >
                    {item.label}
                    <div className='w-4 h-4'>{item.icon}</div>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>

          {footer && (
            <div className='px-4 py-3 border-t border-gray-100'>{footer}</div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
