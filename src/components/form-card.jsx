import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Button, MenuItem } from '@mui/material';
import HousesService from 'services/house-service';

const FormCard = ({
  onSubmit,
}) => {
  const [cities, setCities] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [city, setCity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [img, setImg] = React.useState('');
  const [description, setDescription] = React.useState('');

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

  // React.useEffect(() => {
  //   setTitle('');
  // }, []);

  // const clearFields = () => {
  //   setDescription('');
  // };

  const clearFields = () => {
    setTitle('');
    setPrice('');
    setCity('');
    setDescription('');
    setImg('');
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
      position="sticky"
      top={40}
      component="form"
      width="35%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      border="solid 1px black"
      height="100%"
      borderRadius={1}
      px={5}
      py={6}
      sx={(theme) => ({ backgroundColor: theme.palette.common.white })}
    >
      <Typography variant="h4" pb={6}>Pildyti namų sąrašą</Typography>
      <Box display="flex" flexDirection="column" width="100%" gap={3}>
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
      <Box mt={5} width="100%" display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          sx={(theme) => ({ backgroundColor: theme.palette.background.default })}
          onClick={() => clearFields()}
        >
          Išvalyti laukus
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={(theme) => ({ backgroundColor: theme.palette.background.default })}
        >
          Išsaugoti
        </Button>
      </Box>
    </Box>
  );
};

export default FormCard;
