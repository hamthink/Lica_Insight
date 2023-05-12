import { MouseEvent, useEffect, useState } from 'react';
import {
  Box,
  Card,
  styled,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import BlurOnTwoToneIcon from '@mui/icons-material/BlurOnTwoTone';
import EggAltTwoToneIcon from '@mui/icons-material/EggAltTwoTone';
import TimelineTwoToneIcon from '@mui/icons-material/TimelineTwoTone';
import HeatMap from './Heatmap';
import DotMap from './Dotmap';
import Trace from './Trace';
import { faker } from '@faker-js/faker';

const EmptyResultsWrapper = styled('img')(
  ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`
);

function Maps() {
  // dummy start
  const data = [
    [
      { x: 20, y: 20 },
      { x: 20, y: 50 },
      { x: 30, y: 20 },
      { x: 40, y: 50 },
      { x: 50, y: 20 },
      { x: 60, y: 50 }
    ],
    [
      { x: 10, y: 10 },
      { x: 60, y: 80 },
      { x: 70, y: 60 },
      { x: 80, y: 80 },
      { x: 90, y: 60 },
      { x: 100, y: 80 }
    ],
    [
      { x: 10, y: 80 },
      { x: 30, y: 20 },
      { x: 50, y: 50 },
      { x: 70, y: 80 },
      { x: 90, y: 60 },
      { x: 100, y: 10 }
    ]
  ];

  const newdata = [
    [
      { x: 0, y: 0 },
      { x: 11000, y: 7000 }
    ]
  ];

  const offset = { x: -25, y: 30 };
  const domain = { xStart: 0, xEnd: 11000, yStart: 0, yEnd: 7000 };
  const range = { width: 1200, height: 600 };

  // dummy end

  const [tabs, setTab] = useState<string | null>('HeatMap');
  const [date, setDate] = useState(new Date());

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  const heatmap_data = Array.from({ length: 1 }, () => ({
    x: (1200 / 11000) * faker.datatype.number({ min: 0, max: 11000 }),
    y: (600 / 7000) * faker.datatype.number({ min: 0, max: 7000 }),
    value: faker.datatype.number({ min: 1, max: 5 })
  }));

  const dotmap_data = {
    datasets: [
      {
        label: 'A dataset',
        data: Array.from({ length: 500 }, () => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 })
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)'
      },
      {
        label: 'B dataset',
        data: Array.from({ length: 500 }, () => ({
          x: faker.datatype.number({ min: 0, max: 100 }),
          y: faker.datatype.number({ min: 0, max: 100 })
        })),
        backgroundColor: 'rgba(0, 200, 132, 1)'
      }
    ]
  };

  const map = "url('/static/images/map/map1.png')";

  useEffect(() => {});

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Map List</Typography>
        <ToggleButtonGroup
          value={tabs}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value="HeatMap">
            <EggAltTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="DotMap">
            <BlurOnTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="Trace">
            <TimelineTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {tabs === 'HeatMap' && (
        <HeatMap data={heatmap_data} map={map} range={range} />
      )}

      {tabs === 'DotMap' && (
        <DotMap dataset={dotmap_data} map={map} range={range} />
      )}

      {tabs === 'Trace' && (
        <Trace
          data={newdata}
          offset={offset}
          range={range}
          domain={domain}
          map={map}
        />
      )}

      {!tabs && (
        <Card
          sx={{
            textAlign: 'center',
            p: 3
          }}
        >
          <EmptyResultsWrapper src="/static/images/placeholders/illustrations/1.svg" />

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
            Click something, anything!
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4
            }}
          >
            Maybe, a button?
          </Button>
        </Card>
      )}
    </>
  );
}

export default Maps;
