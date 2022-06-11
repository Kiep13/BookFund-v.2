import { Chip } from '@mui/material';

import { ROLE_LABELS } from '@utils/constants';

import { STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const RoleIndicator = ({ roleName }: IProps) =>
  <Chip
    label={ROLE_LABELS[roleName]}
    size='small'
    sx={STYLES.roleIndicator}
  />
