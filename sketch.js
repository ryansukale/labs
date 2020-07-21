import pipe from '@ramda/pipe';
const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

function createGrid(count) {
  const grid = [];

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      grid.push([
        count <=1 ? 0.5 : x / (count - 1),
        count <=1 ? 0.5 : y / (count - 1)
      ])
    }
  }

  return grid;
}

const scaleGrid = ([width, height]) => points => points.map(
  ([x, y]) => ([x * width, y * height])
);

const drawGrid = context => points => {
  points.forEach(
    ([x, y]) => {
      context.beginPath();
      context.arc(x, y, 50, Math.PI * 2, false);
      context.lineWidth = 10;
      context.strokeStyle = 'green';
      context.stroke();
    }
  );
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // console.log(createGrid(3));
    // const grid = createGrid(3);
    // console.log((grid))
    const grid = pipe(
      createGrid,
      scaleGrid(settings.dimensions),
      // console.log
      drawGrid(context)
    )(4);

    // context.beginPath();
    // context.arc(width/2, height/2, 100, 0, Math.PI * 2);
    // context.fillStyle = 'indigo';
    // context.fill();
    // context.lineWidth = 10;
    // context.strokeStyle = 'green';
    // context.stroke();
  };
};

canvasSketch(sketch, settings);
