import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import { STYLES } from '../../constants';
import { TabPanel } from '../TabPanel';

export const SearchResultTabs = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChange = (event, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={selectedTab}
        onChange={handleChange}
        sx={STYLES.searchResultTabs}
      >
        <Tab label='Books'/>
        <Tab label='Collections'/>
        <Tab label='Authors'/>
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>
    </>
  )
}
