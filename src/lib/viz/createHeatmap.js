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
  cellWidth: 15,
  cellHeight: 15,
  cellSpacing: 1,
  cellSpacingX: undefined,
  cellSpacingY: undefined
}

export default function ({
  node,
  data,
  options
}) {
  const values = data.map(d => d.value);

  const {
    colors,
    cellWidth,
    cellHeight,
    cellSpacing,
    cellSpacingX,
    cellSpacingY,
    rows
  } = {...options, ...defaultOptions};

  const totalCellWidth = cellWidth + (cellSpacingX || cellSpacing);
  const totalCellHeight = cellHeight + (cellSpacingY || cellSpacing);

  const svgWidth = data.length/rows * totalCellWidth;
  
  const svg = d3.select(node)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', rows * totalCellHeight);

  const colorScale = d3.scaleLinear()
    .domain([d3.min(values), d3.max(values)])
    .range([colors.start, colors.end]);

  const cellX = (_, index) => totalCellWidth * Math.floor(index/rows);
  const cellY = (_, index) => totalCellHeight * Math.floor(index%rows);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('rx', 2)
    .attr('width', cellWidth)
    .attr('height', cellHeight)
    .attr('fill', d => colorScale(d.value))
    .attr('x', cellX)
    .attr('y', cellY);
}