import { Box } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { wrapUserPage } from '@components/PageWrapper';
import { StatefulCard } from '@components/cards/StatefulCard';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BaseRoutePaths, CardStates } from '@utils/enums';
import { compose } from '@utils/helpers';
import { useAlerts, useApi } from '@utils/hooks';
import { ISearchOptions, ISearchResults } from '@utils/interfaces';

import { SearchInput, SearchResultTabs } from './components';
import { DEFAULT_SEARCH_OPTIONS, PAGE_TITLE, STYLES } from './constants';
import { ISearchPageParams } from './interfaces';

const Page = () => {
  const params = useParams();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [searchTerm, setSearchTerm] = useState<string>((params as ISearchPageParams).searchTerm || '');
  const [searchResults, setSearchResults] = useState<ISearchResults>();

  const history = useHistory();

  const { search } = useApi();
  const { addError }  = useAlerts();

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    history.replace(`${BaseRoutePaths.SEARCH}/${newSearchTerm}`);
  }

  const loadSearchResult = () => {
    setPageState(CardStates.LOADING);
    const searchOptions: ISearchOptions = {
      ...DEFAULT_SEARCH_OPTIONS,
      searchTerm
    }

    search(searchOptions)
      .then((response: ISearchResults) => {
        setSearchResults(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        setPageState(CardStates.ERROR);
        addError(API_TOOLTIP_ERROR);
      })
  }

  useEffect(() => {
    loadSearchResult();
  }, [searchTerm]);

  return (
    <>
      <EntityPageHeader title={PAGE_TITLE} handleBackClick={() => history.goBack()}/>

      <Box sx={STYLES.page}>
        <SearchInput searchTerm={searchTerm} handleSubmit={handleSearchTermChange}/>

        <StatefulCard state={pageState}>
          <Box sx={STYLES.searchResultWrapper}>
            {
              searchResults && <SearchResultTabs searchResults={searchResults} searchTerm={searchTerm}/>
            }
          </Box>
        </StatefulCard>

      </Box>
    </>
  )
}

export const Search = compose(
  wrapUserPage()
)(Page);
