import { useContext } from 'react'
import { UserContext } from 'contexts/Usercontext'

export function useUser() {
  return useContext(UserContext)
}