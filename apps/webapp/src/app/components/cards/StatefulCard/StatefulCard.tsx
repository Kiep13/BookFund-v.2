import { Box, CircularProgress } from '@mui/material';

import { CardStates } from '@utils/enums';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const StatefulCard = ({ state, isNoContent, isLoading, isError, noContentMessage, children }: IProps) => {

  if(state === CardStates.LOADING || isLoading) {
    return <Box sx={STYLES.wrapper}>
      <CircularProgress size={80}/>
    </Box>
  }

  if(state === CardStates.ERROR || isError) {
    return <Box sx={STYLES.wrapper}>
      Loading error. Please reload page.
    </Box>;
  }

  if(state === CardStates.NO_CONTENT || isNoContent) {
    return <Box sx={STYLES.wrapper}>
      { noContentMessage }
    </Box>;
  }

  return children;
}
