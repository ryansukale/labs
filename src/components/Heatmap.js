import React, {useEffect, useRef} from 'react';
import * as d3 from "d3";

const isSaturday = date => date.getDay() === 6;

const addDays = days => date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function getClosestSaturday(date) {
  if (isSaturday(date)) {
    return date;
  }

  const daysToAdd = 6 - date.getDay();

  return addDays(daysToAdd)(date);
}

function getFirstSunday(weeks, date) {
  const days = 7 * weeks - 1;
  return addDays(-days)(date);
}

export default () => {
  const gridRef = useRef();

  const weeks = 52;
  const today = new Date();
  const closestSaturday = getClosestSaturday(today);
  const firstSunday = getFirstSunday(weeks, closestSaturday);

  const rows = weeks;
  const cols = 7;

  useEffect(() => {
    const gridNode = gridRef.current
    const svg = d3.select(gridNode)
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);

    const data = [1, 2, 3, 4, 5, 6, 7];
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'gray')
      .attr('y', (d) => d * 22)
  }, []);

  return (
    <div ref={gridRef}>
    </div>
  );
}