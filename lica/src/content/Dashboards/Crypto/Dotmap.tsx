import React, { useEffect, useState } from 'react';

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
  CardMedia,
  Button
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
import { format } from 'date-fns';
import { getVisit } from '@/api/visit';

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
  const [floor, setFloor] = useState('8');
  const [store, setStore] = useState('휴게실');
  // const [dataset, setDataset] = useState(props.dataset);

  const [startDate, setStartDate] = useState(
    format(new Date(), 'yyyy-MM-dd hh:mm:ss')
  );
  const [endDate, setEndDate] = useState(
    format(new Date(), 'yyyy-MM-dd hh:mm:ss')
  );
  const [visit, setVisit] = useState(null);
  const [chart, setChart] = useState<typeof Chart | null>(null);

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

  function handleDotmap() {
    const startD = format(new Date(startDate), "yyyy-MM-dd'T'HH:mm:ss");
    const endD = format(new Date(endDate), "yyyy-MM-dd'T'HH:mm:ss");

    // console.log('start date : ' + startDate.toString());
    // console.log('end date : ' + endDate.toString());

    console.log('start date : ' + startD);
    console.log('end date : ' + endD);

    getVisit(
      {
        start: startD,
        end: endD
      },
      ({ data }) => {
        console.log(data);
        // if (data.result === 'success') {
        console.log('정보 가져오기 성공');
        // for (var i of data.infoList) {
        //   i.y = 600 - i.y;
        // }
        setVisit({
          datasets: [
            {
              label: 'A dataset',
              data: data.infoList,
              backgroundColor: 'rgba(255, 99, 132, 1)'
            }
          ]
        });

        // console.log(visit);
        // } else {
        //   console.log('정보 가져오기 실패');
        // }
      },
      (error) => {
        console.error(error);
        alert(error.message);
      }
    );

    const canvas = document.getElementById('dotmap') as HTMLCanvasElement;

    // const newChart = new Chart(canvas, {
    //   type: 'scatter',
    //   data: {
    //     datasets: [
    //       {
    //         label: 'visit',
    //         data: visit
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       x: {
    //         type: 'linear',
    //         position: 'bottom'
    //       },
    //       y: {
    //         type: 'linear',
    //         position: 'left'
    //       }
    //     }
    //   }
    // });

    // setChart(newChart);
    console.log('end');
  }

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
                      label="date time picker start"
                      value={startDate}
                      inputFormat="yyyy-MM-dd HH:mm:ss"
                      onChange={(newDate) => setStartDate(newDate)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Start Date"
                          variant="standard"
                          sx={{ m: 1, mr: 3 }}
                        />
                      )}
                    />
                    <DateTimePicker
                      label="date time picker end"
                      value={endDate}
                      inputFormat="yyyy-MM-dd HH:mm:ss"
                      onChange={(newDate) => setEndDate(newDate)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="End Date"
                          variant="standard"
                          sx={{ m: 1, mr: 3 }}
                        />
                      )}
                    />
                    <Button
                      variant="contained"
                      onClick={handleDotmap}
                      sx={{ mt: 2, mr: 2 }}
                    >
                      확인
                    </Button>
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
                  {visit != null && (
                    <Scatter
                      options={options}
                      data={visit === null ? { datasets: [] } : visit}

                      // data={props.dataset}
                    />
                  )}

                  {/* <CardMedia
                    component="img"
                    sx={{ width: '100%', mt: 7 }}
                    image="/static/images/map/map1.png"
                    alt="LiCa LOGO"
                  /> */}
                </Box>
                <Box>
                  <canvas id="dotmap"></canvas>
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
