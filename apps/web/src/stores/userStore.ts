import { UserStore } from '@/types'
import { create } from 'zustand'

export const useUserStore = create<UserStore>((set) => ({
  email: '',
  userName: '',
  userId: '',
  userProfileURL: '',
  setUser: (user: UserStore) => set(user),
  clearUser: () =>
    set({ email: '', userName: '', userId: '', userProfileURL: '' })
}))
