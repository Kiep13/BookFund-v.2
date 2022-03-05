import { Box, CircularProgress } from '@mui/material';

import { STYLES } from './constants';
import { State } from './enums';
import { IProps } from './props.interface';

export const StatefulCard = (props: IProps) => {
  const { state, noContentMessage } = props;

  let content;

  switch (state) {
    case State.LOADING: {
      content = (<Box sx={STYLES.wrapper}>
        <CircularProgress size={80}/>
      </Box>);
    } break;
    case State.CONTENT: {
      content = props.children;
    } break;
    case State.ERROR: {
      content = (<Box sx={STYLES.wrapper}>
        Loading error. Please reload page.
      </Box>);
    } break;
    case State.NO_CONTENT: {
      content = (<Box sx={STYLES.wrapper}>
        { noContentMessage }
      </Box>);
    } break;
  }

  return content;
}
