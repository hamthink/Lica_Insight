import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import React from 'react';
import Trace from '@/components/Trace';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
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

  return (
    <OverviewWrapper>
      <Head>
        <title>D3.js</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/dashboards/crypto"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  To Dashboard
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Trace data={data} offset={offset} range={range} domain={domain} />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
