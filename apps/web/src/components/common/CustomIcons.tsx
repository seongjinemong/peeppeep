import { UserIcon } from '@heroicons/react/16/solid'
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline'

interface CustomIcons {
  UserIcon: typeof UserIcon
  LogoutIcon: typeof ArrowLeftStartOnRectangleIcon
  ChevronBackIcon: typeof ChevronLeftIcon
}

const CustomIcons: CustomIcons = {
  UserIcon,
  LogoutIcon: ArrowLeftStartOnRectangleIcon,
  ChevronBackIcon: ChevronLeftIcon
}

export default CustomIcons
