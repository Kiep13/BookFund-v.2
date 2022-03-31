import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import { STYLES } from '../../constants';
import { BooksSearchResults } from '../BooksSearchResults';
import { TabLabel } from '../TabLabel';
import { TabPanel } from '../TabPanel';
import { IProps } from './propsInterface';

export const SearchResultTabs = ({searchResults, searchTerm}: IProps) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChange = (event, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={STYLES.searchResultBox}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={selectedTab}
        onChange={handleChange}
        sx={STYLES.searchResultTabs}
      >
        <Tab label={<TabLabel label={'Books'} value={searchResults.books.count}/>}/>
        <Tab label={<TabLabel label={'Collections'} value={searchResults.collections.count}/>}/>
        <Tab label={<TabLabel label={'Authors'} value={searchResults.authors.count}/>}/>
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <BooksSearchResults searchResults={searchResults.books} searchTerm={searchTerm}/>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>
    </Box>
  )
}
