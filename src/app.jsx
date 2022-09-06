import * as React from 'react';
import { Box, Modal } from '@mui/material';
import HousesService from 'services/house-service';
import FormCard from 'components/form-card';
import HouseCard from 'components/house-card';
import EditCard from 'components/edit-card';

const App = () => {
  const [houses, setHouses] = React.useState([]);
  const [houseBeingEdited, setHouseBeingEdited] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setHouseBeingEdited(null);
  };
  const fetchAllHouses = async () => {
    const fetchedHouses = await HousesService.fetchAll();
    setHouses(fetchedHouses);
  };

  const createHouse = async (houseProps) => {
    await HousesService.create(houseProps);
    await fetchAllHouses();
  };

  const editHouse = (id) => {
    const foundHouse = houses.find((house) => house.id === id);
    setHouseBeingEdited(foundHouse);
    setModalOpen(true);
  };

  const updateHouse = async (houseProps) => {
    await HousesService.update(houseBeingEdited.id, houseProps);
    await fetchAllHouses();
    closeModal();
  };

  const removeHouse = async (id) => {
    await HousesService.remove(id);
    fetchAllHouses();
  };

  React.useEffect(() => {
    fetchAllHouses();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={10}
      py={5}
      sx={(theme) => ({ background: theme.palette.background.default })}
    >
      <FormCard
        onSubmit={createHouse}
      />
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <EditCard
            onSubmit={updateHouse}
            initValues={houseBeingEdited}
          />
        </Box>
      </Modal>
      <Box sx={{
        width: '60%',
      }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
        >
          {houses.map(({
            id,
            title,
            description,
            city,
            price,
            img,
          }) => (
            <Box key={id} mb={5}>
              <HouseCard
                title={title}
                description={description}
                img={img}
                city={city}
                price={price}
                onDelete={() => removeHouse(id)}
                onEdit={() => editHouse(id)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
