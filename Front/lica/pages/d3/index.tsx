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
import * as d3 from 'd3';

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

// const data = [
//   [
//     { x: 0, y: 20 },
//     { x: 1, y: 30 },
//     { x: 2, y: 25 },
//     { x: 3, y: 45 },
//     { x: 4, y: 35 },
//     { x: 5, y: 50 }
//   ],
//   [
//     { x: 50, y: 10 },
//     { x: 51, y: 20 },
//     { x: 52, y: 15 },
//     { x: 53, y: 15 },
//     { x: 56, y: 25 },
//     { x: 57, y: 20 }
//   ]
// ];

const data = [
  { x: 10, y: 10 },
  { x: 20, y: 20 },
  { x: 30, y: 30 },
  { x: 40, y: 40 },
  { x: 50, y: 50 },
  { x: 60, y: 60 }
];

const width = 600;
const height = 400;

function Trace() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y))
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.attr('width', width).attr('height', height);

    svg.append('g').attr('transform', 'translate(50, 370)').call(xAxis);
    svg.append('g').attr('transform', 'translate(50, -30)').call(yAxis);

    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .style('fill', 'steelblue');

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr(
        'd',
        d3
          .line()
          .x((d, i) => xScale(i) + 50)
          .y((d) => yScale(d) - 30)
          .curve(d3.curveCatmullRom.alpha(0.5))
      );
  }, []);

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
        <svg ref={svgRef}>{/* SVG 내용 */}</svg>
      </Box>
    </OverviewWrapper>
  );
}

export default Trace;

Trace.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
