import { Avatar, Box } from '@mui/material';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const AvatarBlock = ({account}: IProps) =>
  <Box sx={STYLES.wrapper}>
    <Avatar
      alt={`${account?.name} ${account?.surname}`}
      sx={STYLES.image}
      src={account?.image}
    />
    <Box sx={STYLES.name}>
      {account?.name} {account?.surname}
    </Box>
  </Box>

