import { Popover, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface PopoverItemType<T> {
  id: string | number
  content: ReactNode
  data: T
}

interface CustomPopoverProps<T> {
  trigger: ReactNode
  items?: PopoverItemType<T>[]
  header?: ReactNode
  width?: 'w-32' | 'w-40' | 'w-48' | 'w-56' | 'w-64' | 'w-80' | 'w-96'
  maxHeight?: string
  className?: string
  contentClassName?: string
  position?: 'left' | 'right' | 'top' | 'bottom'
  itemClassName?: (item: T) => string | string
}

export function CustomPopover<T>({
  trigger,
  items,
  header,
  width = 'w-80',
  maxHeight = 'max-h-[25rem]',
  contentClassName,
  className,
  itemClassName,
  position = 'right'
}: CustomPopoverProps<T>): ReactNode {
  return (
    <Popover className='relative'>
      {() => (
        <>
          <Popover.Button as={Fragment}>{trigger}</Popover.Button>
          <Transition
            as={Fragment}
            enter='transition duration-200 ease-out'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition duration-150 ease-in'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel
              className={`absolute ${position}-0 z-10 mt-2 ${width} origin-${position}-start ${maxHeight} rounded-xl bg-background-primary shadow-lg ring-1 ring-black/5 focus:outline-none ${className}`}
            >
              <div className='py-1'>
                {header && (
                  <div className='px-4 py-3 border-b border-border'>
                    {header}
                  </div>
                )}
                <div className={contentClassName}>
                  {items?.map((item) => (
                    <div
                      key={item.id}
                      className={`px-4 py-3 border-b border-border hover:bg-background-secondary ${
                        itemClassName ? itemClassName(item.data) : ''
                      }`}
                    >
                      {item.content}
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
