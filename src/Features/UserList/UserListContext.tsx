import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { User, UserDto } from './User'

interface UserListContextInterface {
  loading: boolean
  error: boolean
  getUsers: () => User[]
  getUser: (index: number) => UserDto
  fetchUsers: () => Promise<void>
}

const UserListContext = createContext<UserListContextInterface | null>(null)

export function UserListProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<boolean>(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')

      if (response.ok) {
        const userData: UserDto[] = await response.json()

        setUsers(userData)
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error: unknown) {
      setError(true)

      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const getUsers = useCallback((): User[] => {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      company: user.company.name,
    }))
  }, [users])

  const getUser = useCallback(
    (id: number): UserDto | undefined =>
      users.find((user) => Number(user.id) === id),
    [users]
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const vvalue = useMemo(
    () => ({
      loading,
      error,
      getUsers,
      getUser,
      fetchUsers,
    }),
    [loading, error, getUsers, getUser, fetchUsers]
  )

  return (
    <UserListContext.Provider value={vvalue}>
      {children}
    </UserListContext.Provider>
  )
}

export function useUserList() {
  const ctx = useContext(UserListContext)

  if (!ctx) {
    throw new Error('useUser must be used within <UserListProvider>')
  }

  return ctx
}
