import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

import { Button, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import type { User } from './User';
import { userListTableConfig } from './config';
import { useUserList } from './UserListContext'

const UserListContainer = () => {
  const { loading, error, getUsers, fetchUsers } = useUserList();

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => userListTableConfig,
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: getUsers(),
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    manualPagination: false,
    muiToolbarAlertBannerProps: error ? { color: 'error', children: 'Error loading data' } : undefined,
    renderTopToolbarCustomActions: error ? () => (
      <Tooltip arrow title="Refresh Data">          
        <Button onClick={fetchUsers} variant="outlined" startIcon={<RefreshIcon />}>
          Refetch
        </Button>
      </Tooltip>
    ) : () => null,
    state: {
      isLoading: loading,
      showAlertBanner: false,
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.info(event, row.id);
      },
      sx: { cursor: 'pointer' },
    }),
  });

  return (
    <MaterialReactTable table={table} />
  )
};

export default UserListContainer;
