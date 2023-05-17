import React, { useEffect, useState } from 'react';
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
  Grid,
  Button
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/lab';
import { getVisit } from '@/api/visit';
import { format } from 'date-fns';

function HeatMap(props) {
  // const width = props.range.width;
  // const height = props.range.height;

  const [floor, setFloor] = useState('1');
  const [store, setStore] = useState('휴게실');
  const [startDate, setStartDate] = useState(
    format(new Date(), 'yyyy-MM-dd hh:mm')
  );
  const [endDate, setEndDate] = useState(
    format(new Date(), 'yyyy-MM-dd hh:mm')
  );
  const [visit, setVisit] = useState(null);

  function handleHeatmap() {
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
        for (var i of data.infoList) {
          i.x = Math.round((1140 / 11400) * i.x) + 70;
          i.y = 700 - Math.round((700 / 7000) * i.y) + 20;
          // i.y = 600 - i.y;
        }
        setVisit(data.infoList);

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
  }

  useEffect(() => {
    var heatmap = h337.create({
      container: document.querySelector('.Heat')
    });

    heatmap.setData({
      max: 50,
      data: visit === null ? '' : visit,
      xMin: 0,
      xMax: props.range.width,
      yMin: 0,
      yMax: props.range.height
      // data: [{ x: 165, y: 200, value: 5 }]
    });

    console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));

    // handleHeatmap(startDate, endDate);
  });

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
                      label="date time picker start"
                      value={startDate}
                      inputFormat="yyyy-MM-dd HH:mm"
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
                      inputFormat="yyyy-MM-dd HH:mm"
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
                      onClick={handleHeatmap}
                      sx={{ mt: 2, mr: 2 }}
                    >
                      확인
                    </Button>
                  </Box>
                </Box>
              </Box>
              <CardContent>
                <div
                  className="Heat"
                  style={{
                    width: props.range.width,
                    // maxWidth: props.range.width,
                    height: props.range.height,
                    margin: '0 auto',
                    backgroundImage: props.map,
                    // backgroundImage: "url('/static/images/map/map1.png')",
                    backgroundSize: 'cover'
                  }}
                ></div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default HeatMap;
