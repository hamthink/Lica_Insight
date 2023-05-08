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
import { scaleLinear, line, curveCatmullRom } from 'd3';

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

const data1 = [
  { x: 0, y: 20 },
  { x: 1, y: 30 },
  { x: 2, y: 25 },
  { x: 3, y: 45 },
  { x: 4, y: 35 },
  { x: 5, y: 50 }
];

const data2 = [
  { x: 50, y: 10 },
  { x: 51, y: 20 },
  { x: 52, y: 15 },
  { x: 53, y: 15 },
  { x: 56, y: 25 },
  { x: 57, y: 20 }
];

const colors = ['red', 'green', 'blue', 'yellow'];

function Overview() {
  const [hoveredLine, setHoveredLine] = useState(null);

  const margin = { top: 20, right: 20, bottom: 30, left: 30 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, data1.length - 1])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data2.map((d) => d.y))])
    .range([height, 0]);

  const lines = [
    { color: 'red', data: data1.slice(0) },
    { color: '#' + 'ffff00', data: data2.slice(0) }
  ];

  const lineGenerator = line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.y))
    .curve(curveCatmullRom.alpha(0.5));

  const handleLineHover = (index) => {
    setHoveredLine(index);
  };

  const handleLineLeave = () => {
    setHoveredLine(null);
  };

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
      <Box>
        <Box>
          <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              {lines.map((line, index) => (
                <path
                  key={index}
                  d={lineGenerator(line.data)}
                  stroke={hoveredLine === index ? line.color : '#ccc'}
                  strokeWidth={hoveredLine === index ? 3 : 1}
                  fill="none"
                  onMouseEnter={() => handleLineHover(index)}
                  onMouseLeave={handleLineLeave}
                />
              ))}
              {data1.map((d, i) => (
                <circle
                  key={i}
                  cx={xScale(i)}
                  cy={yScale(d.y)}
                  r={4}
                  fill="#fff"
                  stroke="#333"
                  strokeWidth={2}
                />
              ))}
              {data2.map((d, i) => (
                <circle
                  key={i}
                  cx={xScale(i)}
                  cy={yScale(d.y)}
                  r={4}
                  fill="#fff"
                  stroke="#333"
                  strokeWidth={2}
                />
              ))}
            </g>
          </svg>
        </Box>
      </Box>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
