import { Avatar, Box } from '@mui/material';

import { STYLES } from './constants';
import './avatarBlock.scss';
import { IProps } from './propsInterface';

export const AvatarBlock = ({ account }: IProps) => {
  return (
    <Box className='avatar'>
      <Avatar className='avatar__image'
              alt='Cindy Baker'
              sx={STYLES.image}
              src={account?.image}/>
      <span className='avatar__name'>{account?.name} {account?.surname}</span>
    </Box>
  )
}
