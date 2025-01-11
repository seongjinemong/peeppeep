import useModalStore from '@stores/modalStore'
import { createPortal } from 'react-dom'

import { Modal, ModalProps, ModalRoot } from '@components/ui/modal'

export const ModalPortal = () => {
  // 전역 모달 상태를 가져옴
  const { content, isModalOpen, closeModal } = useModalStore()

  const el = document.getElementById('modal')
  if (!el) return null
  return createPortal(
    <ModalRoot
      isOpen={isModalOpen}
      onClose={closeModal}
      title={content.title}
      children={content.children}
      className={content.className}
    />,
    el
  )
}
