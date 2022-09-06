import * as React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Image from './image';
import TypographyLimited from './typography-limited';

const HouseCard = ({
  title,
  img,
  description,
  city,
  price,
  onDelete,
  onEdit,
}) => (
  <Card sx={{
    display: 'flex',
    height: '250px',
    alignSelf: 'center',
  }}
  >
    <Box sx={{ position: 'relative' }}>
      <Image
        src={img}
      />
    </Box>
    <CardContent sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
    }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        <Typography variant="h5" component="div">{title}</Typography>
        <Typography variant="h6" component="div">{`${price} €`}</Typography>
      </Box>
      <Typography mt={1}>{city}</Typography>
      <TypographyLimited mt={2}>{description}</TypographyLimited>
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton
            sx={(theme) => ({ color: theme.palette.common.black })}
            size="large"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton
            sx={(theme) => ({ color: theme.palette.common.black })}
            size="large"
            onClick={onEdit}
          >
            <ModeEditIcon />
          </IconButton>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default HouseCard;
