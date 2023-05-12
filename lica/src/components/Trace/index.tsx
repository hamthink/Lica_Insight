import * as d3 from 'd3';
import randomColor from 'randomcolor';
import React, { useRef, useEffect } from 'react';

function Trace(props) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleLinear()
      .domain([props.domain.xStart, props.domain.xEnd])
      .range([0, props.range.width]);
    const yScale = d3
      .scaleLinear()
      .domain([props.domain.yStart, props.domain.yEnd])
      .range([props.range.height, 0]);

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

    svg.attr('width', props.range.width).attr('height', props.range.height);

    svg.append('g').attr('transform', 'translate(30, 370)').call(xAxis);
    svg.append('g').attr('transform', 'translate(30, -30)').call(yAxis);

    svg
      .selectAll('circle')
      .data(props.data)
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
    props.data.forEach((array) => {
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
    <svg
      ref={svgRef}
      transform={`translate(${props.offset.x},${props.offset.y})`}
    >
      {/* SVG 내용 */}
    </svg>
  );
}

export default Trace;
