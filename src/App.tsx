import './App.css'

import UserListContainer from './Features/UserList/UserListContainer'
import { UserListProvider } from './Features/UserList/UserListContext'

export default function App() {
  return (
    <UserListProvider>
      <UserListContainer />
    </UserListProvider>
  )
}
