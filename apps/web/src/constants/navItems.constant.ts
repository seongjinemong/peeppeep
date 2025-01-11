import { leftSideElementProps } from '@/types/sidebarType'

const leftSideElements: leftSideElementProps[] = [
  { name: 'HomeIcon', to: '/', title: '홈' },
  { name: 'HomeIcon', to: '/story', title: '스토리' },
  { name: 'ChatIcon', to: '/chat', title: '채팅' }
]
const leftSideBottomElements: leftSideElementProps[] = [
  {
    name: 'SettingsIcon',
    title: '설정'
  },
  {
    name: 'LogoutIcon',
    title: '로그아웃'
  }
]
export { leftSideElements, leftSideBottomElements }
