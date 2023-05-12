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

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Chart, Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const plugin = {
  id: 'scatter',
  beforeDraw: (chart) => {
    // if (image.complete) {
    const ctx = chart.ctx;
    const { top, left, width, height } = chart.chartArea;

    // const image = new Image();
    // image.src = '/static/images/map/map1.png';

    // const x = left + width / 2 - image.width / 2 + 200;
    // const y = top + height / 2 - image.height / 2 - 100;
    const x = 1485;
    const y = 727;
    // ctx.drawImage(image, x, y);
    // } else {
    //   image.onload = () => chart.draw();
    // }
  }
};

function DotMap(props) {
  const [floor, setFloor] = React.useState('8');
  const [store, setStore] = React.useState('휴게실');
  const [date, setDate] = React.useState(new Date());
  const [dataset, setDataset] = React.useState(props.dataset);
  // const [time, setTime] = React.useState('');

  const FloorhandleChange = (event: SelectChangeEvent) => {
    setFloor(event.target.value);
  };

  const StorehandleChange = (event: SelectChangeEvent) => {
    setStore(event.target.value);
  };

  const options = {
    scales: {
      y: {
        display: false,
        min: 0,
        max: props.range.height
      },
      x: {
        display: false,
        min: 0,
        max: props.range.width
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  useEffect(() => {});

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
                        <MenuItem value={8}>8층</MenuItem>
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
                <Box
                  sx={{
                    backgroundImage: props.map,
                    backgroundSize: 'cover'
                  }}
                >
                  <Scatter options={options} data={dataset} />
                  {/* <CardMedia
                    component="img"
                    sx={{ width: '100%', mt: 7 }}
                    image="/static/images/map/map1.png"
                    alt="LiCa LOGO"
                  /> */}
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
