import { Typography, Rating } from '@mui/material';

import { IProps } from './propsInterface';

export const RateStep = ({handleRate}: IProps) => {
  const handleRateChange = (event: React.SyntheticEvent, value: number | null) => {
    if(Boolean(value)) {
      handleRate(value);
    }
  }

  return (
    <>
      <Typography component='legend'>Give book a rate</Typography>
      <Rating value={null} precision={0.5} onChange={handleRateChange}/>
    </>
  )
}

