import { Box, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';

import { STYLES } from '../../constants';
import { IProps } from './propsInterface';

export const FilePromo = ({fileName, clearImage}: IProps) => {
  return (
    <Box sx={STYLES.filePromo.wrapper}>
      <Box sx={STYLES.filePromo.leftPart}>
        <PictureAsPdfTwoToneIcon sx={STYLES.filePromo.pdfIcon}/>
        <Typography component='legend' noWrap={true}>{ fileName }</Typography>
      </Box>
      <DeleteTwoToneIcon sx={STYLES.filePromo.deleteIcon} onClick={clearImage}/>
    </Box>
  )
}
