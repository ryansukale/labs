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
    bottom: 50,
    right: 10
  },
  rows: 7,
  brickWidth: 15,
  brickHeight: 15,
  brickSpacing: 1,
  brickSpacingX: undefined,
  brickSpacingY: undefined
}

export function getBrickWallDimensions({
  data,
  options
}) {
  const {
    margin,
    brickWidth,
    brickHeight,
    brickSpacing,
    brickSpacingX,
    brickSpacingY,
    rows
  } = {...defaultOptions, ...options};

  console.log('brickWidth', brickWidth);

  const totalbrickWidth = brickWidth + (brickSpacingX || brickSpacing);
  const totalbrickHeight = brickHeight + (brickSpacingY || brickSpacing);

  const marginX = margin.left + margin.right;
  const marginY = margin.top + margin.bottom;

  const svgWidth = data.length / rows * totalbrickWidth;
  const svgHeight = rows * totalbrickHeight + marginY;

  return {
    totalbrickWidth,
    totalbrickHeight,
    margin,
    marginX,
    marginY,
    svgWidth,
    svgHeight
  };
}

export default function renderBrickWall({
  element,
  data,
  options = {}
}) {
  const intensities = data.map(d => d.intensity);

  // const {
  //   colors,
  //   margin,
  //   brickWidth,
  //   brickHeight,
  //   brickSpacing,
  //   brickSpacingX,
  //   brickSpacingY,
  //   rows
  // } = {...options, ...defaultOptions};

  // const totalbrickWidth = brickWidth + (brickSpacingX || brickSpacing);
  // const totalbrickHeight = brickHeight + (brickSpacingY || brickSpacing);

  // const marginX = margin.left + margin.right;
  // const marginY = margin.top + margin.bottom;

  // const svgWidth = data.length/rows * totalbrickWidth;
  // const svgHeight = rows * totalbrickHeight + marginY;

  const {
    totalbrickWidth,
    totalbrickHeight,
    marginX,
    svgWidth,
    svgHeight
  } = getBrickWallDimensions({data, options});

  console.log('options', options)
  const {
    colors,
    margin,
    brickWidth,
    brickHeight,
    rows
  } = {...defaultOptions, ...options};

  const svg = d3.select(element)
      .attr('width', svgWidth + marginX)
      .attr('height', svgHeight);
  
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


  // const xAxisClass = 'axis-x';
  // svg.selectAll(`.${xAxisClass}`).remove();

  // const scaleX = d3.scaleTime()
  //   .domain(d3.extent(data.map(d => d.date)))
  //   .range([margin.left, svgWidth]);

  // const xAxis = svg.append("g")
  //   .attr('class', `${xAxisClass}`)
  //   .attr("transform", `translate(-${margin.left + margin.right}, ${svgHeight - margin.bottom})`)
  //   .call(d3.axisBottom(scaleX));
  
  // xAxis.selectAll('line').remove();
  // xAxis.select(".domain").remove();
}