import { useEffect } from 'react';

import { Card } from '@components/cards/Card';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';

import { UserContent } from './components';
import { STYLES } from './constants';
import { useUser } from './useUser';

export const User = () => {
  const {
    pageState,
    userId,
    user,
    loadUser,
    navigateBack
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
        />
      )}

      <StatefulCard state={pageState}>
        <Card styles={STYLES.page}>
          {user && <UserContent user={user}/>}
        </Card>
      </StatefulCard>
    </>
  );
};
