import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, ReactNode } from 'react'

import { cn } from '../../../utils'
import { Button } from '../button'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string | ReactNode
  confirmText?: string
  onConfirm?: () => void
  icon?: ReactNode
  className?: string
}

export function SuccessModal({
  isOpen,
  onClose,
  title,
  description,
  confirmText = '확인',
  onConfirm,
  icon,
  className
}: SuccessModalProps) {
  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className={cn('relative z-50', className)}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-xl bg-background-primary p-6 text-left align-middle shadow-xl transition-all'>
                <div className='flex justify-end'>
                  <button
                    onClick={onClose}
                    className='rounded-lg p-1 text-text-secondary hover:bg-background-secondary'
                  >
                    <XMarkIcon className='h-5 w-5' />
                  </button>
                </div>

                <div className='flex flex-col items-center text-center mt-2'>
                  {icon || (
                    <CheckCircleIcon className='h-20 w-20 text-green-500 mb-4' />
                  )}
                  <Dialog.Title
                    as='h3'
                    className='text-2xl font-semibold text-primary'
                  >
                    {title}
                  </Dialog.Title>
                  {description && (
                    <Dialog.Description className='mt-2 text-base text-text-secondary'>
                      {description}
                    </Dialog.Description>
                  )}

                  <Button
                    onClick={handleConfirm}
                    className='mt-6'
                    variant='filled'
                    size='md'
                  >
                    {confirmText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
