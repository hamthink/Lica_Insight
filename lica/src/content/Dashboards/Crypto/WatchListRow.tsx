import {
  Button,
  Card,
  Grid,
  Box,
  Typography,
  useTheme,
  TextField
} from '@mui/material';
import Label from 'src/components/Label';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import { DatePicker } from '@mui/lab';
import { getVisitWeekly } from '@/api/visit';
import { format } from 'date-fns';

function WatchListRow() {
  const theme = useTheme();

  const [selDate, setSelDate] = useState(null);
  const [visitorList, setVisitorList] = useState(null);

  function handleDateChange(date) {
    setSelDate(date);
  }

  function handleWeeklyVisitor() {
    const date = format(new Date(selDate), 'yyyy-MM-dd');
    getVisitWeekly(
      {
        endDate: date
      },
      ({ data }) => {
        console.log('데이터 가져오기 성공');
        console.log(data.weeklyStats);
        var list = [];
        for (var i of data.weeklyStats) {
          console.log(i.visitors);
          list.push(parseInt(i.visitors));
        }
        // console.log(visitorList);
        setVisitorList(list);
      },
      (error) => {
        console.error(error);
        alert(error.messege);
      }
    );
  }

  const today = new Date(selDate); // 현재 날짜를 가져옵니다.
  const day1 = new Date(today.getTime()).toLocaleDateString(); // 하루 전의 날짜
  const day2 = new Date(
    today.getTime() - 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 이틀 전의 날짜
  const day3 = new Date(
    today.getTime() - 2 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 사흘 전의 날짜
  const day4 = new Date(
    today.getTime() - 3 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 넷째 날 전의 날짜
  const day5 = new Date(
    today.getTime() - 4 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 다섯째 날 전의 날짜
  const day6 = new Date(
    today.getTime() - 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 여섯째 날 전의 날짜
  const day7 = new Date(
    today.getTime() - 6 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 일주일 전의 날짜

  const Box1Options: ApexOptions = {
    chart: {
      animations: {
        enabled: false
      },
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    labels: [day7, day6, day5, day4, day3, day2, day1],
    stroke: {
      curve: 'smooth',
      colors: [theme.colors.primary.main],
      width: 3
    },
    yaxis: {
      show: false
    },
    colors: [theme.colors.primary.main],
    grid: {
      padding: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'visitors: ';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  const Box1Data = [
    {
      name: 'Visitors per Day',
      data: visitorList
    }
  ];

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Card
          sx={{
            overflow: 'visible'
          }}
        >
          <Box
            sx={{
              p: 3
            }}
          >
            <Box>
              <DatePicker
                label="Date Picker"
                value={selDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Date"
                    variant="standard"
                    sx={{ m: 1, mr: 3 }}
                  />
                )}
              />
              <Button
                variant="contained"
                onClick={handleWeeklyVisitor}
                sx={{ mt: 2, mr: 2 }}
              >
                확인
              </Button>
            </Box>
            <Label color="secondary">last 7 days</Label>
            {visitorList === null ? (
              <Typography
                align="center"
                variant="h2"
                fontWeight="normal"
                color="text.secondary"
                sx={{
                  mt: 3,
                  mb: 3
                }}
                gutterBottom
              >
                Please select date!
              </Typography>
            ) : (
              <Chart
                options={Box1Options}
                series={Box1Data}
                type="area"
                height={500}
              />
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default WatchListRow;
