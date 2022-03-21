import { Box } from '@mui/material';

import { STYLES } from './components';
import { IProps } from './propsInterface';

export const TextWithHint = ({ text } : IProps) =>
    <Box component='div' sx={STYLES.textWithHint} title={text}>{ text }</Box>
