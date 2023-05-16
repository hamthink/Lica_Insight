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
  const range = { width: 1140, height: 700 };

  // dummy end

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
    console.log(auth);
    if (auth === null || !auth.isLoggedIn) {
      // sessionStorage에 값이 없거나(null)이거나, 로그아웃 했을 경우
      alert('로그인 필요');
      window.location.href = '/user/login';
    } else {
      // sessionStorage에 값이 있고, 로그인 되어 있을 경우
      // sessionStorage에서 정보 가져와서 atom에 저장
      const user = JSON.parse(sessionStorage.getItem('user'));
      console.log(user);
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
