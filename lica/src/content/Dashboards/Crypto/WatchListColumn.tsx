import {
  Card,
  Box,
  Typography,
  Grid,
  useTheme,
  TextField,
  Button
} from '@mui/material';
import Label from 'src/components/Label';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import { DatePicker } from '@mui/lab';
import { getVisitDaily } from '@/api/visit';
import { format } from 'date-fns';

function WatchListColumn() {
  const theme = useTheme();

  const [selDate, setSelDate] = useState(null);
  const [visitorList, setVisitorList] = useState(null);

  function handleDateChange(date) {
    setSelDate(date);
  }

  function handleDailyVisitor() {
    const date = format(new Date(selDate), 'yyyy-MM-dd');
    getVisitDaily(
      {
        date: date
      },
      ({ data }) => {
        console.log('데이터 가져오기 성공');
        console.log(data.dailyStats);
        var list = [];
        for (var i of data.dailyStats) {
          // console.log(i.visitors);
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

  const chartOptions: ApexOptions = {
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
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: [theme.colors.primary.main],
    dataLabels: {
      enabled: false
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      colors: [theme.colors.primary.main],
      width: 3
    },
    legend: {
      show: false
    },
    labels: [
      '00:00 - 00:59',
      '01:00 - 01:59',
      '02:00 - 02:59',
      '03:00 - 03:59',
      '04:00 - 04:59',
      '05:00 - 05:59',
      '06:00 - 06:59',
      '07:00 - 07:59',
      '08:00 - 08:59',
      '09:00 - 09:59',
      '10:00 - 10:59',
      '11:00 - 11:59',
      '12:00 - 12:59',
      '13:00 - 13:59',
      '14:00 - 14:59',
      '15:00 - 15:59',
      '16:00 - 16:59',
      '17:00 - 17:59',
      '18:00 - 18:59',
      '19:00 - 19:59',
      '20:00 - 20:59',
      '21:00 - 21:59',
      '22:00 - 22:59',
      '23:00 - 23:59'
    ],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false,
      tickAmount: 5
    },
    tooltip: {
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'visitors : ';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  const chart1Data = [
    {
      name: 'Visitors per Hour',
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
          <Box sx={{ p: 3 }}>
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
                onClick={handleDailyVisitor}
                sx={{ mt: 2, mr: 2 }}
              >
                확인
              </Button>
            </Box>
            <Label color="secondary">last 24h</Label>
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
                options={chartOptions}
                series={chart1Data}
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

export default WatchListColumn;
