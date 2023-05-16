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
  Grid,
  Button
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/lab';
import { getVisitTrack } from '@/api/visit';
import { start } from 'nprogress';
import { format } from 'date-fns';
import { apiInstance } from '@/api';

function Trace(props) {
  let svgRef = useRef(null);
  // const [svgRef, setSvgRef] = React.useState(null);

  const [floor, setFloor] = React.useState('8');
  const [store, setStore] = React.useState('휴게실');
  const [startDate, setStartDate] = React.useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
  );
  const [endDate, setEndDate] = React.useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
  );
  const [trackData, setTrackData] = React.useState([]);

  const FloorhandleChange = (event: SelectChangeEvent) => {
    setFloor(event.target.value);
  };

  const StorehandleChange = (event: SelectChangeEvent) => {
    setStore(event.target.value);
  };

  async function handleTrack() {
    const svg = d3.select(svgRef.current);

    let startD = null;
    let endD = null;
    try {
      startD = format(new Date(startDate), "yyyy-MM-dd'T'HH:mm:ss");
      endD = format(new Date(endDate), "yyyy-MM-dd'T'HH:mm:ss");
    } catch (error) {
      console.error(error);
      alert('날짜를 다시 입력하세요.');
    }

    console.log('start date : ' + startD);
    console.log('end date : ' + endD);

    const api = apiInstance();

    try {
      const response = await api.get(`/visit/track/throttled`, {
        params: { start: startD, end: endD }
      });
      console.log(response.data);
      setTrackData(Object.values(response.data.trackList));
    } catch (error) {
      console.log(error);
    }

    // getVisitTrack(
    //   {
    //     start: startD,
    //     end: endD
    //   },
    //   ({ data }) => {
    //     console.log('성공!');
    //     // console.log(data.trackList);
    //     console.log(Object.values(data.trackList));
    //     setTrackData(Object.values(data.trackList));
    //     console.log('------------');
    //     drawChart(svg, props);

    //     // console.log(trackData);
    //     // trackData = data;
    //   },
    //   (error) => {
    //     console.error(error);
    //     // alert(error.message);
    //     console.log('getVisitTrack error');
    //   }
    // );
  }

  function drawChart(svg, props) {
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
      .selectAll('.line')
      .data(trackData)
      .enter()
      .append('path')
      .attr('cx', function (d) {
        return xScale(d.x) + 30;
      })
      .attr('cy', function (d) {
        return yScale(d.y) - 30;
      })
      .attr('r', 3)
      .attr('fill', randomColor());

    // 곡선 추가
    trackData.forEach((array) => {
      svg
        .append('path')
        .datum(array)
        .attr('d', line)
        .attr('stroke', randomColor())
        .attr('stroke-width', 10)
        .attr('fill', 'none');
    });
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    drawChart(svg, props);
  }, [trackData]);

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
                      label="date start time picker"
                      value={startDate}
                      inputFormat="yyyy-MM-dd HH:mm:ss"
                      onChange={(startTime) => setStartDate(startTime)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Start Time"
                          variant="standard"
                          sx={{ m: 1, mr: 3 }}
                        />
                      )}
                    />
                    <DateTimePicker
                      label="date end time picker"
                      value={endDate}
                      inputFormat="yyyy-MM-dd HH:mm:ss"
                      onChange={(endTime) => setEndDate(endTime)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="End Time"
                          variant="standard"
                          sx={{ m: 1, mr: 3 }}
                        />
                      )}
                    />
                    <Button
                      variant="contained"
                      onClick={handleTrack}
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
