import * as d3 from "d3";

// const defaultColors = {
//   start: '#cacaca',
//   end: 'blue'
// };

const defaultOptions = {
  colors: {
    start: '#cacaca',
    end: 'blue'
  },
  rows: 7,
  brickWidth: 15,
  brickHeight: 15,
  brickSpacing: 1,
  brickSpacingX: undefined,
  brickSpacingY: undefined
}

export default function ({
  node,
  data,
  options
}) {
  const values = data.map(d => d.value);

  const {
    colors,
    brickWidth,
    brickHeight,
    brickSpacing,
    brickSpacingX,
    brickSpacingY,
    rows
  } = {...options, ...defaultOptions};

  const totalbrickWidth = brickWidth + (brickSpacingX || brickSpacing);
  const totalbrickHeight = brickHeight + (brickSpacingY || brickSpacing);

  const svgWidth = data.length/rows * totalbrickWidth;
  
  const svg = d3.select(node)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', rows * totalbrickHeight);

  const colorScale = d3.scaleLinear()
    .domain([d3.min(values), d3.max(values)])
    .range([colors.start, colors.end]);

  const brickX = (_, index) => totalbrickWidth * Math.floor(index/rows);
  const brickY = (_, index) => totalbrickHeight * Math.floor(index%rows);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('rx', 2)
    .attr('width', brickWidth)
    .attr('height', brickHeight)
    .attr('fill', d => colorScale(d.value))
    .attr('x', brickX)
    .attr('y', brickY);
}