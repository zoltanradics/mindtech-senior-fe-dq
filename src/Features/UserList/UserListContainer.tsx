import { useMemo, useState } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table'

import { Button, Dialog, Tooltip } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'

import type { User, UserDto } from './User'
import { userListTableConfig } from './config'
import { useUserList } from './UserListContext'
import UserCard from './UserCard'

const UserListContainer = () => {
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null)
  const { loading, error, getUsers, getUser, fetchUsers } = useUserList()
  const columns = useMemo<MRT_ColumnDef<User>[]>(() => userListTableConfig, [])
  const data = useMemo(() => getUsers(), [getUsers])

  const table = useMaterialReactTable({
    data,
    columns,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    manualPagination: false,
    muiToolbarAlertBannerProps: {
      color: 'error',
      children: 'Error loading data',
    },
    renderTopToolbarCustomActions: error
      ? () => (
          <Tooltip arrow title="Refresh Data">
            <Button
              onClick={fetchUsers}
              variant="outlined"
              startIcon={<RefreshIcon />}
            >
              Refetch
            </Button>
          </Tooltip>
        )
      : () => null,
    state: {
      isLoading: loading,
      showAlertBanner: error,
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => showModal(row.original.id),
      sx: { cursor: 'pointer' },
    }),
  })

  function showModal(rowId: number): void {
    const index = Number(rowId)
    const selectedUser = getUser(index)

    setSelectedUser(selectedUser)
  }

  function hideModal(): void {
    setSelectedUser(null)
  }

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog open={!!selectedUser}>
        <UserCard user={selectedUser} hideModal={hideModal} />
      </Dialog>
    </>
  )
}

export default UserListContainer
