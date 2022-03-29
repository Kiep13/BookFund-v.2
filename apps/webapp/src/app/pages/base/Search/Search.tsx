import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { wrapUserPage } from '@components/PageWrapper';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { compose } from '@utils/helpers';

import { SearchInput, SearchResultTabs } from './components';
import { PAGE_TITLE, STYLES } from './constants';

const Page = () => {
  const history = useHistory();

  return (
    <>
      <EntityPageHeader title={PAGE_TITLE} handleBackClick={() => history.goBack()}/>

      <Box sx={STYLES.page}>
        <SearchInput/>

        <Box sx={STYLES.searchResultTabsWrapper}>
          <SearchResultTabs/>
        </Box>
      </Box>
    </>
  )
}

export const Search = compose(
  wrapUserPage()
)(Page);
