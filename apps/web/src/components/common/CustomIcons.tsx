import { UserIcon } from '@heroicons/react/16/solid'
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  PlusIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

interface CustomIcons {
  UserIcon: typeof UserIcon
  LogoutIcon: typeof ArrowLeftStartOnRectangleIcon
  ChevronBackIcon: typeof ChevronLeftIcon
  PlusIcon: typeof PlusIcon
  HeartIcon: typeof HeartIcon
}

const CustomIcons: CustomIcons = {
  UserIcon,
  LogoutIcon: ArrowLeftStartOnRectangleIcon,
  ChevronBackIcon: ChevronLeftIcon,
  PlusIcon,
  HeartIcon
}

export default CustomIcons
