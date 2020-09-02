import React, {useEffect} from 'react';

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
  const weeks = 52;
  const today = new Date();
  const closestSaturday = getClosestSaturday(today);
  const firstSunday = getFirstSunday(weeks, closestSaturday);

  return (
    <div></div>
  );
}