import {
  Button,
  Card,
  Box,
  CardActions,
  Typography,
  Avatar,
  alpha,
  Stack,
  Divider,
  styled,
  useTheme,
  TextField
} from '@mui/material';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/lab';
import { getVisitWeekly } from '@/api/visit';
import { format } from 'date-fns';
import { error } from 'console';

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

  const today = new Date(); // 현재 날짜를 가져옵니다.

  const day1 = new Date(
    today.getTime() - 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 하루 전의 날짜
  const day2 = new Date(
    today.getTime() - 2 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 이틀 전의 날짜
  const day3 = new Date(
    today.getTime() - 3 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 사흘 전의 날짜
  const day4 = new Date(
    today.getTime() - 4 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 넷째 날 전의 날짜
  const day5 = new Date(
    today.getTime() - 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 다섯째 날 전의 날짜
  const day6 = new Date(
    today.getTime() - 6 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(); // 여섯째 날 전의 날짜
  const day7 = new Date(
    today.getTime() - 7 * 24 * 60 * 60 * 1000
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
      width: 2
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
      fixed: {
        enabled: true
      },
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
    <Card>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <Box
          sx={{
            width: '100%',
            p: 3
          }}
        >
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1
                }}
              >
                <Box>
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
                </Box>
              </Typography>
            </Box>
          </Box>
          <Box pt={2}>
            {visitorList === null ? (
              <Typography
                align="center"
                variant="h2"
                fontWeight="normal"
                color="text.secondary"
                sx={{
                  mt: 3
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
            {/* <Chart
              options={Box1Options}
              series={Box1Data}
              type="line"
              height={500}
            /> */}
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}

export default WatchListRow;
