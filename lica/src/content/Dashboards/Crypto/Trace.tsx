import * as d3 from 'd3';
import randomColor from 'randomcolor';
import React, { useRef, useEffect } from 'react';
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

function Trace(props) {
  const [floor, setFloor] = React.useState('8');
  const [store, setStore] = React.useState('휴게실');
  const [date, setDate] = React.useState(new Date());

  const FloorhandleChange = (event: SelectChangeEvent) => {
    setFloor(event.target.value);
  };

  const StorehandleChange = (event: SelectChangeEvent) => {
    setStore(event.target.value);
  };

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleLinear()
      .domain([props.domain.xStart, props.domain.xEnd])
      .range([0, props.range.width]);
    const yScale = d3
      .scaleLinear()
      .domain([props.domain.yStart, props.domain.yEnd])
      .range([props.range.height, 0]);

    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.x) + 30;
      })
      .y(function (d) {
        return yScale(d.y) - 30;
      })
      .curve(d3.curveCatmullRom.alpha(0.5)); // 곡선 형태 지정

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.attr('width', props.range.width).attr('height', props.range.height);

    // svg.append('g').attr('transform', 'translate(30, 370)').call(xAxis);
    // svg.append('g').attr('transform', 'translate(30, -30)').call(yAxis);

    svg
      .selectAll('circle')
      .data(props.data)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return xScale(d.x) + 30;
      })
      .attr('cy', function (d) {
        return yScale(d.y) - 30;
      })
      .attr('r', 3)
      .attr('fill', randomColor());

    // 곡선 추가
    props.data.forEach((array) => {
      svg
        .append('path')
        .datum(array)
        .attr('d', line)
        .attr('stroke', randomColor())
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    });
  }, []);

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
                    Trace
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
                  <svg
                    ref={svgRef}
                    transform={`translate(${props.offset.x},${props.offset.y})`}
                  >
                    {/* SVG 내용 */}
                  </svg>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Trace;
