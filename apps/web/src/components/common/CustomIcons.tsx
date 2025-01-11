import { UserIcon } from '@heroicons/react/16/solid'
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  PlusIcon,
  HeartIcon,
  HomeIcon,
  CogIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'

type IconName =
  | 'UserIcon'
  | 'LogoutIcon'
  | 'ChevronBackIcon'
  | 'PlusIcon'
  | 'HeartIcon'
  | 'HomeIcon'
  | 'SettingsIcon'
  | 'ChatIcon'
  | 'SearchIcon'
  | 'MenuIcon'
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
  SettingsIcon: CogIcon,
  ChatIcon: ChatBubbleLeftIcon,
  SearchIcon: MagnifyingGlassIcon,
  MenuIcon: Bars3Icon
}

const CustomIcon = ({ name, className = '' }: IconProps) => {
  const Icon = IconComponents[name]
  return <Icon className={className} />
}

export default CustomIcon
export type { IconName }
