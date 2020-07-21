import pipe from '@ramda/pipe';
import canvasSketch from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';

const settings = {
  dimensions: [ 2048, 2048 ]
};

const view = {
  margins: [ 300 ]
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
  ([x, y]) => {
    const [margin] = view.margins;
    return [
      lerp(margin, width - margin, x),
      lerp(margin, height - margin, y),
      Math.abs(random.gaussian()) * width / 180,
    ]
  }
);

const drawGrid = context => points => {
  points.forEach(
    ([x, y, radius]) => {
      context.beginPath();
      context.arc(x, y, radius, Math.PI * 2, false);
      context.fillStyle = 'indigo';
      context.fill();
      // context.lineWidth = 5;
      // context.strokeStyle = 'black';
      // context.stroke();
    }
  );
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // random.setSeed(10);
    pipe(
      createGrid,
      scaleGrid(settings.dimensions),
      (points => points.filter(() => random.value() > 0.5)),
      drawGrid(context)
    )(20);

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
