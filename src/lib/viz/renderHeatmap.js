import * as d3 from "d3";
import renderBrickWall, { getBrickWallDimensions } from './renderBrickWall';

function renderAxis({
  element,
  data,
  options
}) {
  const svg = d3.select(element);
  const {
    margin,
    svgWidth,
    svgHeight
  } = getBrickWallDimensions({data, options});

  const xAxisClass = 'axis-x';
  svg.selectAll(`.${xAxisClass}`).remove();

  const scaleX = d3.scaleTime()
    .domain(d3.extent(data.map(d => d.date)))
    .range([margin.left, svgWidth]);

  const xAxis = svg.append("g")
    .attr('class', `${xAxisClass}`)
    .attr("transform", `translate(-${margin.left + margin.right}, ${svgHeight - margin.bottom})`)
    .call(d3.axisBottom(scaleX));
  
  xAxis.selectAll('line').remove();
  xAxis.select(".domain").remove();
}

export default function renderHeatmap({
  element,
  data,
  options
}) {
  renderBrickWall({element, data, options});
  renderAxis({element, data, options});
}