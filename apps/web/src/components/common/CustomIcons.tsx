import { UserIcon } from '@heroicons/react/16/solid'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

interface CustomIcons {
  UserIcon: typeof UserIcon
  LogoutIcon: typeof ArrowLeftStartOnRectangleIcon
}

const CustomIcons: CustomIcons = {
  UserIcon,
  LogoutIcon: ArrowLeftStartOnRectangleIcon
}

export default CustomIcons
