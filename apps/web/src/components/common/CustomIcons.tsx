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
  Bars3Icon,
  XMarkIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

import LogoIcon from '../../assets/images/icons/Logo.svg?react'

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
  | 'XMarkIcon'
  | 'SendIcon'
  | 'LogoIcon'
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
  MenuIcon: Bars3Icon,
  XMarkIcon: XMarkIcon,
  SendIcon: PaperAirplaneIcon,
  LogoIcon: LogoIcon
}

const CustomIcon = ({ name, className = '' }: IconProps) => {
  const Icon = IconComponents[name]
  return <Icon className={className} />
}

export default CustomIcon
export type { IconName }
