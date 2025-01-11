import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

import { cn } from '../../../utils'

export interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ onClose, title, children, className }: ModalProps) {
  return (
    <>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </Transition.Child>

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel
              className={cn(
                'w-full flex flex-col max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                className
              )}
            >
              <div className='flex items-center justify-between relative p-4'>
                {title && (
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-medium leading-6 text-gray-900 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                  >
                    {title}
                  </Dialog.Title>
                )}
                <button
                  type='button'
                  className='rounded-md outline-none hover:bg-gray-100 absolute right-0 top-0'
                  onClick={onClose}
                >
                  <XMarkIcon className='h-5 w-5 text-gray-500' />
                </button>
              </div>
              <div className='flex-1'>{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </>
  )
}
