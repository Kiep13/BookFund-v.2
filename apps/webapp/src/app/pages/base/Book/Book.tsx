import { useHistory } from 'react-router-dom';

import { wrapUserPage } from '@components/PageWrapper';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { compose } from '@utils/helpers';

import { PAGE_TITLE } from './constants';

export const Page = () => {
  const history = useHistory();

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={() => history.goBack()}/>
    </>
  )
}


export const Book = compose(
  wrapUserPage()
)(Page);
