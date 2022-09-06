import * as React from 'react';
import {
  Typography,
  Button, MenuItem,
  Box,
  TextField,
} from '@mui/material';
import HousesService from 'services/house-service';

const EditCard = ({
  onSubmit,
  initValues,
}) => {
  const [cities, setCities] = React.useState([]);
  const [title, setTitle] = React.useState(initValues?.title ?? '');
  const [city, setCity] = React.useState(initValues?.cityId ?? '');
  const [price, setPrice] = React.useState(initValues?.price ?? '');
  const [img, setImg] = React.useState(initValues?.img ?? '');
  const [description, setDescription] = React.useState(initValues?.description ?? '');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      cityId: city,
      price: Number(price),
      img,
      description,
    });
  };

  React.useEffect(() => {
    (async () => {
      const fethedCities = await HousesService.fetchCities();
      setCities(fethedCities);
    })();
  }, []);

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      border="solid 1px black"
      height="100%"
      width="500px"
      borderRadius={1}
      px={5}
      py={6}
      sx={(theme) => ({ backgroundColor: theme.palette.common.white })}
    >
      <Typography variant="h4" pb={6}>Pakeisti duomenis</Typography>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        gap={3}
      >
        <TextField
          variant="filled"
          width="100%"
          label="Pavadinimas"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          variant="filled"
          type="number"
          label="Kaina"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField
          variant="filled"
          select
          label="Miestas"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        >
          {cities.map(({ id, title: cityTitle }) => (
            <MenuItem key={id} value={id}>{cityTitle}</MenuItem>
          ))}
        </TextField>
        <TextField
          variant="filled"
          label="Aprašymas"
          multiline
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          variant="filled"
          label="Nuotrauka"
          value={img}
          onChange={(event) => setImg(event.target.value)}
        />
      </Box>
      <Box mt={5}>
        <Button variant="contained" type="submit" sx={(theme) => ({ backgroundColor: theme.palette.background.default })}>Keisti</Button>
      </Box>
    </Box>
  );
};

export default EditCard;
