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
import { RecoilEnv, useSetRecoilState } from 'recoil';
import { authState, userState } from 'atoms';

const EmptyResultsWrapper = styled('img')(
  ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`
);

// Duplicate atom key 에러 메시지 없애기
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function Maps() {
  const offset = { x: 45, y: 10 };
  const domain = { xStart: 0, xEnd: 11000, yStart: 0, yEnd: 7000 };
  const range = { width: 1140, height: 700 };

  const [tabs, setTab] = useState<string | null>('HeatMap');
  const [date, setDate] = useState(new Date());

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  const map = "url('/static/images/map/map1.png')";

  const setAccessToken = useSetRecoilState(authState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const authString = sessionStorage.getItem('auth');
    const auth = JSON.parse(authString);
    if (auth === null || !auth.isLoggedIn) {
      alert('로그인 필요');
      window.location.href = '/user/login';
    } else {
      const user = JSON.parse(sessionStorage.getItem('user'));
      setAccessToken(auth);
      setUser(user);
    }
  });

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

      {tabs === 'HeatMap' && <HeatMap map={map} range={range} />}

      {tabs === 'DotMap' && <DotMap map={map} range={range} />}

      {tabs === 'Trace' && (
        <Trace offset={offset} range={range} domain={domain} map={map} />
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
