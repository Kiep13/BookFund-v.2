import { Box } from '@mui/material';
import { useEffect } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';

import { SearchInput, SearchResultTabs } from './components';
import { PAGE_TITLE, STYLES } from './constants';
import { useSearch } from './useSearch';

export const Search = () => {
 const {
   pageState,
   searchResults,
   searchTerm,
   loadSearchResult,
   handleSearchTermChange,
   navigateBack
 } = useSearch();

  useEffect(() => {
    loadSearchResult();
  }, [searchTerm]);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={navigateBack}
      />

      <Box sx={STYLES.page}>
        <SearchInput searchTerm={searchTerm} handleSubmit={handleSearchTermChange}/>

        <StatefulCard state={pageState}>
          <Box sx={STYLES.searchResultWrapper}>
            {searchResults && <SearchResultTabs searchResults={searchResults} searchTerm={searchTerm}/>}
          </Box>
        </StatefulCard>

      </Box>
    </>
  )
}
