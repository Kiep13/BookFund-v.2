import { wrapUserPage } from '@components/PageWrapper';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { compose } from '@utils/helpers';

import { PAGE_TITLE } from './constants';
import { useHistory } from "react-router-dom";

const Page = () => {
  const history = useHistory();

  return (
    <EntityPageHeader
      title={PAGE_TITLE}
      handleBackClick={() => history.goBack()}/>
  )
}

export const Collection = compose(
  wrapUserPage()
)(Page);

