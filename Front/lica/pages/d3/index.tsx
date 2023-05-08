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
import Hero from 'src/content/Overview/Hero';
import React, { useRef, useEffect, useState } from 'react';

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

const [data, setData] = useState([24, 30, 45, 70, 26]);
const svgRef = useRef(null);

useEffect(() => {
  const svg = select(svgRef.current); // selection 객체

  svg
    .selectAll('circle')
    .data(data)
    .join(
      (enter) => enter.append('circle'),
      (update) => update.attr('class', 'updated'),
      (exit) => exit.remove()
    )
    .attr('r', (value) => value)
    .attr('cx', (value) => value * 2)
    .attr('cy', (value) => value * 2)
    .attr('stroke', 'red');
}, [data]);

function Overview() {
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
                  Button D3.js
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Box>
        <Box></Box>
        <Button variant="contained" sx={{ ml: 2 }}>
          Button
        </Button>
      </Box>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
