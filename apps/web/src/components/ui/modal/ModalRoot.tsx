import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { Modal, ModalProps } from './Modal'

export function ModalRoot({
  isOpen,
  onClose,
  title,
  children,
  className
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Modal
          onClose={onClose}
          title={title}
          children={children}
          className={className}
        />
      </Dialog>
    </Transition>
  )
}
