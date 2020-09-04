import React, {useEffect, useRef} from 'react';
import * as d3 from "d3";

const isSaturday = date => date.getDay() === 6;

const addDays = days => date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function getDaysUntilSaturday(date) {
  if (isSaturday(date)) {
    return date;
  }

  const daysToAdd = 6 - date.getDay();

  return addDays(daysToAdd)(date);
}

function getDaysBetween(start, end) {
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
}

function getFirstSunday(weeks, date) {
  const days = 7 * weeks - 1;
  return addDays(-days)(date);
}

function getNumberRange(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

function createFakeData(count) {
  const items = getNumberRange(1, count);
  return items;
}

export default () => {
  const gridRef = useRef();

  const weeks = 52;
  const today = new Date();
  const closestSaturday = getDaysUntilSaturday(today);
  const firstSunday = getFirstSunday(weeks, closestSaturday);

  const rows = weeks;
  const columns = 7;

  useEffect(() => {
    const gridNode = gridRef.current;
    const svg = d3.select(gridNode)
      .append('svg')
      .attr('width', 900)
      .attr('height', 300);

    const data = createFakeData(rows * columns);
    const cellWidth = 16;
    const cellHeight = 16;
    const cellX = (d, index) => cellWidth * Math.floor(index/7);
    const cellY = (d, index) => cellHeight * Math.floor(index%7);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', cellWidth - 2)
      .attr('height', cellHeight - 2)
      .attr('fill', '#cacaca')
      .attr('x', cellX)
      .attr('y', cellY);
  }, []);

  return (
    <div ref={gridRef}>
    </div>
  );
}