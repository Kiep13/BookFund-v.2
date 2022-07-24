import { Avatar, Box, Card, CardActionArea, CardContent, Typography  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RoleIndicator } from '@components/RoleIndicator';
import { AdminRoutePaths, Roles } from '@utils/enums';

import { STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const UserCard = ({user}: IProps) => {
  const navigate = useNavigate();

  const navigateToUserPage = () => {
    navigate(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.USER}/${user.id}`)
  }

  return (
    <Card sx={STYLES.userCard.wrapper} onClick={navigateToUserPage}>
      <CardActionArea>
        <CardContent sx={STYLES.userCard.content}>
          <Avatar alt={user.fullName} src={user.image} sx={STYLES.userCard.image}/>
          <Box sx={STYLES.userCard.info}>
            <Typography component='legend'>
              {user.fullName}
            </Typography>

            {user.role !== Roles.User && <RoleIndicator roleName={user.role}/>}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
