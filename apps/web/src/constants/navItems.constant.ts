import { leftSideElementProps } from '@/types/sidebarType'

const leftSideElements: leftSideElementProps[] = [
  { name: 'HomeIcon', to: '/', title: '홈' },
  { name: 'LogoIcon', to: '/story', title: '스토리' }
]
const leftSideBottomElements: leftSideElementProps[] = [
  {
    name: 'LogoutIcon',
    title: '로그아웃'
  }
]
export { leftSideElements, leftSideBottomElements }
