import React, { useEffect } from 'react';

import {
  Card,
  Box,
  CardContent,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Grid,
  CardMedia
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/lab';

function DotMap() {
  const [floor, setFloor] = React.useState('');
  const [store, setStore] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  // const [time, setTime] = React.useState('');

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
              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flex={1}
                >
                  <Typography variant="h3" sx={{ mt: 2, ml: 2 }}>
                    DotMap
                  </Typography>
                  <Box />
                  <Box component="div" display="flex">
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
                        <MenuItem value="이마트">이마트</MenuItem>
                        <MenuItem value="롯데마트">롯데마트</MenuItem>
                        <MenuItem value="홈플러스">홈플러스</MenuItem>
                        <MenuItem value="롯데백화점">롯데백화점</MenuItem>
                        <MenuItem value="신세계백화점">신세계백화점</MenuItem>
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
                        <MenuItem value={1}>1층</MenuItem>
                        <MenuItem value={2}>2층</MenuItem>
                        <MenuItem value={3}>3층</MenuItem>
                        <MenuItem value={4}>4층</MenuItem>
                        <MenuItem value={5}>5층</MenuItem>
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
                <Box>
                  <CardMedia
                    component="img"
                    sx={{ width: '100%', mt: 7 }}
                    image="/static/images/map/map1.png"
                    alt="LiCa LOGO"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DotMap;

// display="flex"
//         justifyContent="space-between"
//         flexGrow={1}
//         margin="0 auto"
//         maxWidth="1200px"
