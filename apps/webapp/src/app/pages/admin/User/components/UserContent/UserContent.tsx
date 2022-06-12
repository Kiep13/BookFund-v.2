import { Avatar, Box, Typography } from '@mui/material';

import { RoleIndicator } from '@components/RoleIndicator';
import { Roles } from '@utils/enums';
import { formatData } from '@utils/helpers';

import { PROPERTIES, STYLES } from '../../constants';
import { IProperty } from '../../interfaces';
import { IProps } from './propsInterface';

export const UserContent = ({user}: IProps) =>
  <Box sx={STYLES.userContent.wrapper}>
    <Avatar
      alt={user.fullName}
      src={user.image}
      sx={STYLES.userContent.image}
    />

    <Box>
      <Box sx={STYLES.userContent.titleWrapper}>
        <Typography
          variant='h3'
          gutterBottom
          component='div'
          sx={STYLES.userContent.title}
        >
          {user.fullName}
        </Typography>
        {user.role !== Roles.User && <RoleIndicator roleName={user.role}/>}
      </Box>

      <Box>
        {PROPERTIES.map((property: IProperty) => {
          return <Box sx={STYLES.userContent.propertyWrapper} key={property.fieldName}>
            <Typography component='legend' sx={STYLES.userContent.propertyLabel}>{property.label}: </Typography>
            <Typography component='legend'>{formatData(user[property.fieldName], property.formatter)}</Typography>
          </Box>
        })}
      </Box>
    </Box>
  </Box>
