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
  useTheme
} from '@mui/material';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import { useState, useEffect } from 'react';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function WatchListRow() {
  const theme = useTheme();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
      name: 'visitors',
      data: [55.701, 57.598, 48.607, 46.439, 58.755, 46.978, 58.16]
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
                    <Typography variant="h2" noWrap>
                      {date.toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Label color="secondary">last 7 days</Label>
                </Box>
              </Typography>
            </Box>
          </Box>
          <Box pt={2}>
            <Chart
              options={Box1Options}
              series={Box1Data}
              type="line"
              height={500}
            />
          </Box>
        </Box>
      </Stack>
      <Divider />
      <CardActions
        disableSpacing
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button variant="outlined">View more assets</Button>
      </CardActions>
    </Card>
  );
}

export default WatchListRow;
