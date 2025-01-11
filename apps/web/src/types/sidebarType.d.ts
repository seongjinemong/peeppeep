import { IconName } from '@components/common/CustomIcons'

interface leftSideElementProps {
  name: IconName
  to?: string
  title: string
  children?: {
    name: IconName
    to: string
    title: string
  }[]
}

export type { leftSideElementProps }
