import {
  Card,
  Box,
  Typography,
  Avatar,
  Grid,
  alpha,
  useTheme,
  styled,
  TextField,
  Button
} from '@mui/material';
import Label from 'src/components/Label';
import Text from 'src/components/Text';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/lab';
import { getVisitDaily } from '@/api/visit';
import { format } from 'date-fns';
import { error } from 'console';

function WatchListColumn(props) {
  const theme = useTheme();

  const [date, setDate] = useState(new Date());
  const [selDate, setSelDate] = useState(null);

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

  const [visitorList, setVisitorList] = useState(null);

  useEffect(() => {
    const params = { date: date };
    getVisitDaily(
      params,
      ({ data }) => {
        props.data = data;
      },
      console.log('getVisitDaily error')
    );
  }, [date]);

  const chartOptions: ApexOptions = {
    chart: {
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
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23'
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
              <Button onClick={handleDailyVisitor}>확인</Button>
            </Box>
            <Label color="secondary">last 24h</Label>
          </Box>
          {visitorList === null ? (
            <div>데이터가 없습니다.</div>
          ) : (
            <Chart
              options={chartOptions}
              series={chart1Data}
              type="area"
              height={500}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  );
}

export default WatchListColumn;
