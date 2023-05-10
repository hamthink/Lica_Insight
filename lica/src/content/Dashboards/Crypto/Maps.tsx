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
  const [tabs, setTab] = useState<string | null>('HeatMap');

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
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

      {tabs === 'DotMap' && <DotMap />}

      {tabs === 'Trace' && <Trace />}

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
