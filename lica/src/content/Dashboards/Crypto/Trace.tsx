import React, { useEffect } from 'react';
import h337 from 'heatmap.js';

import {
  Card,
  Box,
  CardContent,
  Typography,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Trace() {
  useEffect(() => {
    var heatmap = h337.create({
      container: document.querySelector('.Heat')
    });

    heatmap.setData({
      max: 25,
      data: [
        { x: 165, y: 200, value: 5 },
        { x: 160, y: 250, value: 4 },
        { x: 150, y: 260, value: 5 },
        { x: 100, y: 270, value: 5 },
        { x: 165, y: 250, value: 5 },
        { x: 160, y: 255, value: 4 },
        { x: 150, y: 265, value: 5 },
        { x: 150, y: 275, value: 5 },
        { x: 100, y: 20, value: 5 },
        { x: 100, y: 30, value: 4 },
        { x: 100, y: 40, value: 5 },
        { x: 105, y: 50, value: 5 },
        { x: 100, y: 60, value: 5 },
        { x: 100, y: 70, value: 4 },
        { x: 100, y: 80, value: 5 },
        { x: 100, y: 90, value: 5 },
        { x: 20, y: 15, value: 5 },
        { x: 20, y: 14, value: 4 },
        { x: 20, y: 13, value: 5 },
        { x: 20, y: 11, value: 5 },
        { x: 500, y: 20, value: 5 },
        { x: 600, y: 30, value: 4 },
        { x: 700, y: 40, value: 5 },
        { x: 800, y: 50, value: 5 },
        { x: 900, y: 60, value: 5 },
        { x: 900, y: 70, value: 4 },
        { x: 900, y: 80, value: 5 },
        { x: 900, y: 90, value: 5 },
        { x: 500, y: 200, value: 5 },
        { x: 600, y: 300, value: 4 },
        { x: 700, y: 400, value: 5 },
        { x: 800, y: 500, value: 5 },
        { x: 900, y: 600, value: 5 },
        { x: 900, y: 700, value: 4 },
        { x: 900, y: 800, value: 5 },
        { x: 900, y: 900, value: 5 },
        { x: 100, y: 150, value: 5 },
        { x: 100, y: 140, value: 4 },
        { x: 100, y: 130, value: 5 },
        { x: 100, y: 110, value: 5 }
      ]
    });
  });

  const [floor, setFloor] = React.useState('');
  const [store, setStore] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFloor(event.target.value);
    setStore(event.target.value);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      ></Box>
      <Card>
        {/* <CardHeader title="HeatMap" /> */}
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flex={1}
          >
            {
              <Typography variant="h3" sx={{ mt: 2, ml: 2 }}>
                Trace
              </Typography>
            }
            <Box />
            <Box component="div">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="store-select">Store</InputLabel>
                <Select
                  labelId="store-select"
                  id="store"
                  value={store}
                  label="Store"
                  onChange={handleChange}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="이마트">이마트</MenuItem>
                  <MenuItem value="롯데마트">롯데마트</MenuItem>
                  <MenuItem value="홈플러스">홈플러스</MenuItem>
                  <MenuItem value="롯데백화점">롯데백화점</MenuItem>
                  <MenuItem value="신세계백화점">신세계백화점</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="floor-select">Floor</InputLabel>
                <Select
                  labelId="floor-select"
                  id="floor"
                  value={floor}
                  label="Floor"
                  onChange={handleChange}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={1}>1층</MenuItem>
                  <MenuItem value={2}>2층</MenuItem>
                  <MenuItem value={3}>3층</MenuItem>
                  <MenuItem value={4}>4층</MenuItem>
                  <MenuItem value={5}>5층</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <CardContent>
          <div className="Heat" style={{ width: 1000, height: 600 }}>
            {/* <h1>First Heatmap</h1>
                        <h2>Heatmap test test test</h2> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Trace;
