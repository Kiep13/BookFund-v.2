import { Box, CircularProgress } from '@mui/material';

import { CardStates } from '@utils/enums';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const StatefulCard = ({ state, noContentMessage, children }: IProps) => {
  let content;

  switch (state) {
    case CardStates.LOADING: {
      content = (<Box sx={STYLES.wrapper}>
        <CircularProgress size={80}/>
      </Box>);
    } break;
    case CardStates.CONTENT: {
      content = children;
    } break;
    case CardStates.ERROR: {
      content = (<Box sx={STYLES.wrapper}>
        Loading error. Please reload page.
      </Box>);
    } break;
    case CardStates.NO_CONTENT: {
      content = (<Box sx={STYLES.wrapper}>
        { noContentMessage }
      </Box>);
    } break;
  }

  return content;
}
