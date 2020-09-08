import * as d3 from "d3";

const defaultColors = {
  start: '#cacaca',
  end: 'blue'
};

export default function ({
  node,
  data,
  colors = defaultColors
}) {
  const svg = d3.select(node)
      .append('svg')
      .attr('width', 900)
      .attr('height', 300);

    const values = data.map(d => d.value);

    const colorScale = d3.scaleLinear()
      .domain([d3.min(values), d3.max(values)])
      .range([colors.start, colors.end]);

    const cellWidth = 16;
    const cellHeight = 16;
    const cellX = (_, index) => cellWidth * Math.floor(index/7);
    const cellY = (_, index) => cellHeight * Math.floor(index%7);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('rx', 2)
      .attr('width', cellWidth - 3)
      .attr('height', cellHeight - 3)
      .attr('fill', d => colorScale(d.value))
      .attr('x', cellX)
      .attr('y', cellY);
}