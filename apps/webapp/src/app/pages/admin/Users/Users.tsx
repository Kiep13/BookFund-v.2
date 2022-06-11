import { Box, TablePagination, TextField } from '@mui/material';
import { useEffect } from 'react';

import { PageHeaderCard } from '@components/headers/PageHeaderCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { IUser } from '@utils/interfaces';

import { UserCard } from './components';
import { STYLES } from './constants';
import { useUsers } from './useUsers';

export const Users = () => {
  const {
    state,
    data,
    count,
    searchTerm,
    rowsPerPage,
    page,
    rowsPerPageOptions,
    loadUsers,
    handleTyping,
    handlePageChange,
    handleRowsPerPageChanged,
  } = useUsers();

  useEffect(() => {
    loadUsers(searchTerm);
  }, [searchTerm, rowsPerPage, page]);

  return (
    <>
      <Box sx={STYLES.box}>
        <PageHeaderCard title='User management'/>
      </Box>

      <Box sx={STYLES.content}>
        <TextField
          fullWidth
          placeholder='Type user name here...'
          sx={STYLES.searchInput}
          onChange={handleTyping}
        />

        <StatefulCard state={state}>
          <TablePagination
            component='div'
            count={count}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onRowsPerPageChange={handleRowsPerPageChanged}
          />

          <Box sx={STYLES.cardsWrapper}>
            {data.map((user: IUser) => <UserCard key={user.id} user={user}/>)}
          </Box>
        </StatefulCard>
      </Box>
    </>
  )
}

