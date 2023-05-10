import React, { useEffect } from 'react';

import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled,
  MenuItem,
  InputLabel,
  FormControl,
  CardHeader
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function DotMap() {
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
        sx={{ pb: 3, mt: 10 }}
      >
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
                DotMap
              </Typography>
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
            <div className="Heat" style={{ width: 1000, height: 600 }}></div>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default DotMap;
