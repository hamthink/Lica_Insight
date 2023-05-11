import React, { useEffect } from 'react';
import h337 from 'heatmap.js';

import {
  Card,
  Box,
  CardContent,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Grid
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/lab';
import { faker } from '@faker-js/faker';

function HeatMap() {
  useEffect(() => {
    var heatmap = h337.create({
      container: document.querySelector('.Heat')
    });

    heatmap.setData({
      max: 25,
      data: Array.from({ length: 3500 }, () => ({
        x: faker.datatype.number({ min: 0, max: 1200 }),
        y: faker.datatype.number({ min: 0, max: 1000 }),
        value: faker.datatype.number({ min: 1, max: 5 })
      }))
      // data: [{ x: 165, y: 200, value: 5 }]
    });
  });

  const [floor, setFloor] = React.useState('1');
  const [store, setStore] = React.useState('휴게실');
  const [date, setDate] = React.useState(new Date());

  const FloorhandleChange = (event: SelectChangeEvent) => {
    setFloor(event.target.value);
  };

  const StorehandleChange = (event: SelectChangeEvent) => {
    setStore(event.target.value);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              {/* <CardHeader title="HeatMap" /> */}
              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flex={1}
                >
                  <Typography variant="h3" sx={{ mt: 2, ml: 2 }}>
                    HeatMap
                  </Typography>
                  <Box />
                  <Box component="div">
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 200 }}
                    >
                      <InputLabel id="store-select">Store</InputLabel>
                      <Select
                        labelId="store-select"
                        id="store"
                        value={store}
                        label="Store"
                        onChange={StorehandleChange}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="휴게실">휴게실</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 100 }}
                    >
                      <InputLabel id="floor-select">Floor</InputLabel>
                      <Select
                        labelId="floor-select"
                        id="floor"
                        value={floor}
                        label="Floor"
                        onChange={FloorhandleChange}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={1}>8층</MenuItem>
                      </Select>
                    </FormControl>

                    <DateTimePicker
                      label="date time picker"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Date"
                          variant="standard"
                          sx={{ m: 1, mr: 3 }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>
              <CardContent>
                <div
                  className="Heat"
                  style={{
                    width: '100%',
                    height: 600,
                    margin: '0 auto',
                    backgroundImage: "url('/static/images/map/map1.png')",
                    backgroundSize: 'cover'
                  }}
                >
                  {/* <h1>First Heatmap</h1>
                            <h2>Heatmap test test test</h2> */}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default HeatMap;
