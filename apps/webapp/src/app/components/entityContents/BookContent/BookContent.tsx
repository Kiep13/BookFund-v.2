import { Box, Chip, Typography } from '@mui/material';
import { Image } from 'mui-image';
import { Link } from 'react-router-dom';

import { IGenre } from '@utils/interfaces';

import { IMAGE_PROPERTIES, STYLES } from './constants';
import { IProps } from './propsInterface';

export const BookContent = ({ book, authorLink }: IProps) =>
  <Box sx={STYLES.content}>
    <Image
      src={book?.image || ''}
      width={IMAGE_PROPERTIES.width}
      height={IMAGE_PROPERTIES.height}
      fit={IMAGE_PROPERTIES.fit}
      errorIcon={IMAGE_PROPERTIES.errorIcon}
      bgColor={IMAGE_PROPERTIES.backgroundColor}
      sx={STYLES.image}/>

    <Box sx={STYLES.info}>
      <Typography variant='h3' gutterBottom component='div'>
        { book?.title || '' }
      </Typography>

      <Box sx={STYLES.descriptionBlock}>
        <Box>
          <Typography variant='body2' sx={STYLES.attributeLabel}>Author: </Typography>
          <Typography variant='body2' sx={STYLES.attributeValue}>
            <Link to={`${authorLink}/${book?.author?.id}`}
                  style={STYLES.link}>
              { book?.author?.name } {book?.author?.surname}
            </Link>
          </Typography>
        </Box>
        <Box>
          <Typography variant='body2' sx={STYLES.attributeLabel}>Year: </Typography>
          <Typography variant='body2' sx={STYLES.attributeValue}>{ book?.year }</Typography>
        </Box>
        <Box>
          <Typography variant='body2' sx={STYLES.attributeLabel}>Amount of pages: </Typography>
          <Typography variant='body2' sx={STYLES.attributeValue}>{ book?.amountPages }</Typography>
        </Box>
      </Box>

      {
        book?.genres?.map((genre: IGenre) => {
          return <Chip label={genre.name}
                       key={genre.id}
                       color='primary'
                       variant='outlined'
                       sx={STYLES.chip}/>
        })
      }

      {
        book?.description?.split('\n').map((text: string, index: number) => {
          return <p key={`paragraph_${index}`}>{text}</p>
        })
      }
    </Box>
  </Box>
