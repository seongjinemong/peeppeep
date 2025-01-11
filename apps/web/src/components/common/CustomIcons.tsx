import { UserIcon } from '@heroicons/react/16/solid'
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  PlusIcon,
  HeartIcon,
  HomeIcon,
  CogIcon
} from '@heroicons/react/24/outline'

type IconName =
  | 'UserIcon'
  | 'LogoutIcon'
  | 'ChevronBackIcon'
  | 'PlusIcon'
  | 'HeartIcon'
  | 'HomeIcon'
  | 'SettingsIcon'
  | 'LogoutIcon'

interface IconProps {
  name: IconName
  className?: string
}

const IconComponents = {
  UserIcon,
  LogoutIcon: ArrowLeftStartOnRectangleIcon,
  ChevronBackIcon: ChevronLeftIcon,
  PlusIcon,
  HeartIcon,
  HomeIcon,
  SettingsIcon: CogIcon
}

const CustomIcon = ({ name, className = '' }: IconProps) => {
  const Icon = IconComponents[name]
  return <Icon className={className} />
}

export default CustomIcon
export type { IconName }
