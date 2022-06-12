import { useEffect } from 'react';

import { Card } from '@components/cards/Card';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates, Roles } from '@utils/enums';

import { UserContent } from './components';
import { STYLES } from './constants';
import { useUser } from './useUser';
import { Button } from '@mui/material';

export const User = () => {
  const {
    pageState,
    userId,
    user,
    isRoleActionsShown,
    loadUser,
    navigateBack,
    handleRoleUpdate
  } = useUser();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      {userId && (
        <EntityPageHeader
          title={`User ${userId}`}
          handleBackClick={navigateBack}
        >
          {isRoleActionsShown() && pageState === CardStates.CONTENT && <Button
            variant='contained'
            sx={STYLES.actionButton}
            onClick={handleRoleUpdate}
          >
            {user?.role === Roles.User ? 'Give admin rights' : 'Remove admin rights'}
          </Button>}
        </EntityPageHeader>
      )}

      <StatefulCard state={pageState}>
        <Card styles={STYLES.page}>
          {user && <UserContent user={user}/>}
        </Card>
      </StatefulCard>
    </>
  );
};
