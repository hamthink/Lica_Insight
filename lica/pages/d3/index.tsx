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
import randomColor from 'randomcolor';

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

function get_random_color() {}

function Trace({ width, height, data }) {
  // dummy start
  data = [
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

  width = 600;
  height = 400;
  // dummy end

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3.scaleLinear().domain([0, 110]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 110]).range([height, 0]);

    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.x) + 30;
      })
      .y(function (d) {
        return yScale(d.y) - 30;
      })
      .curve(d3.curveCatmullRom.alpha(0.5)); // 곡선 형태 지정

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.attr('width', width).attr('height', height);

    svg.append('g').attr('transform', 'translate(30, 370)').call(xAxis);
    svg.append('g').attr('transform', 'translate(30, -30)').call(yAxis);

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return xScale(d.x) + 30;
      })
      .attr('cy', function (d) {
        return yScale(d.y) - 30;
      })
      .attr('r', 3)
      .attr('fill', randomColor());

    // 곡선 추가
    data.forEach((array) => {
      svg
        .append('path')
        .datum(array)
        .attr('d', line)
        .attr('stroke', randomColor())
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    });
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
        <svg ref={svgRef} transform="translate(50, 50)">
          {/* SVG 내용 */}
        </svg>
      </Box>
    </OverviewWrapper>
  );
}

export default Trace;

Trace.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
