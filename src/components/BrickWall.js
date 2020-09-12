import React, {useEffect, useRef} from 'react';

import createBrickWall from '../lib/viz/createBrickWall';

import random from 'canvas-sketch-util/random';

const randomizer = random.createRandom(25);
// https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md

const isSaturday = date => date.getDay() === 6;

const addDays = days => date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function getDaysBetween(start, end) {
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
}

function getDaysUntilSaturday(date) {
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

function getNumberRange(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

function createFakeData(count) {
  const items = getNumberRange(1, count);
  return items.map((day) => {
    return {
      dayInRange: day,
      impressions: Math.floor(randomizer.range(0, 11))
    };
  });
}

export default () => {
  const gridRef = useRef();

  const weeks = 52;
  const today = new Date();
  const closestSaturday = getDaysUntilSaturday(today);
  const firstSunday = getFirstSunday(weeks, closestSaturday);

  const rows = weeks;
  const columns = 7;

  const data = createFakeData(rows * columns).map(d => ({
    intensity: d.impressions
  }));

  useEffect(() => {
    createBrickWall({
      node: gridRef.current,
      data
    });
  }, [data]);

  return (
    <div ref={gridRef}>
    </div>
  );
}