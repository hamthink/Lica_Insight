import { MouseEvent, useState } from 'react';
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
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import TimelineTwoToneIcon from '@mui/icons-material/TimelineTwoTone';
import HeatMap from './Heatmap';
import DotMap from './Dotmap';
import Trace from './Trace';

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

  const offset = { x: 50, y: 50 };
  const domain = { xStart: 0, xEnd: 100, yStart: 0, yEnd: 100 };
  const range = { width: 600, height: 400 };

  // dummy end

  const [tabs, setTab] = useState<string | null>('HeatMap');

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

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
            <BlurOnTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="DotMap">
            <TableRowsTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="Trace">
            <TimelineTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {tabs === 'HeatMap' && <HeatMap />}

      {tabs === 'DotMap' && <DotMap />}

      {tabs === 'Trace' && (
        <Trace data={data} offset={offset} range={range} domain={domain} />
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
