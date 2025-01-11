import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const { user, clearUser } = useUserStore()
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    clearUser()
    navigate('/')
  }
  useEffect(() => {
    if (user?.userId && user?.email) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
      navigate('/')
    }
  }, [user])

  return { isAuth, user, handleLogout }
}
