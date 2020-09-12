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
  margin: {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
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
  const intensities = data.map(d => d.intensity);

  const {
    colors,
    margin,
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

  const marginX = margin.left + margin.right;
  const marginY = margin.top + margin.bottom;
  
  const svg = d3.select(node)
      .append('svg')
      .attr('width', svgWidth + marginX)
      .attr('height', rows * totalbrickHeight + marginY);

  const colorScale = d3.scaleLinear()
    .domain([d3.min(intensities), d3.max(intensities)])
    .range([colors.start, colors.end]);

  const brickX = (_, index) => margin.left + totalbrickWidth * Math.floor(index/rows);
  const brickY = (_, index) => margin.top + totalbrickHeight * Math.floor(index%rows);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('rx', 2)
    .attr('width', brickWidth)
    .attr('height', brickHeight)
    .attr('fill', d => colorScale(d.intensity))
    .attr('x', brickX)
    .attr('y', brickY);
}