import pipe from '@ramda/pipe';
import canvasSketch from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

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

const drawCircle = context => ({x, y, radius, fill}) => {
  context.save();
  context.beginPath();
  context.arc(x, y, radius, Math.PI * 2, false);
  context.fillStyle = fill;
  context.fill();
  context.restore();
}

const drawStroke = context => ({width, color}) => {
  context.save();
  context.lineWidth = width;
  context.strokeStyle = color;
  context.stroke();
  context.restore();
}

const drawText = context => ({
  x,
  y,
  rotation,
  text,
  fontSize,
  fontFamily = "Helvetica",
  fill
}) => {
  context.save();
  context.font = `${fontSize} "${fontFamily}"`;
  context.fillStyle = fill;
  context.translate(x, y);
  rotation && context.rotate(rotation);
  context.fillText(text, 0, 0);
  context.restore();
}

const palette = random.shuffle(
  random.pick(palettes)
  ).slice(0, 2);
console.log(palette);

const scaleGridCircle = ([width, height]) => points => points.map(
  ([x, y]) => {
    const [margin] = view.margins;
    const radius = Math.abs(random.noise2D(x, y)) * .05;

    return {
      x: lerp(margin, width - margin, x),
      y: lerp(margin, height - margin, y),
      radius: radius * width,
      // radius: Math.abs(0.01 + random.gaussian()) * 0.01 * width,
      fill: random.pick(palette)
    }
  }
);

const scaleGridText = ([width, height]) => points => points.map(
  ([x, y]) => {
    const [margin] = view.margins;
    const radius = Math.abs(random.noise2D(x, y)) * .05;

    return {
      x: lerp(margin, width - margin, x),
      y: lerp(margin, height - margin, y),
      radius: radius * width,
      fill: random.pick(palette),
      text: random.pick(['-','|']),
      fontSize: `${radius * width}px`,
      rotation: random.noise2D(x, y)
    }
  }
);

const drawGrid = context => points => {
  const drawCirc = drawCircle(context);
  const drawT = drawText(context);
  points.forEach(drawT);
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // random.setSeed(10);
    pipe(
      createGrid,
      scaleGridText(settings.dimensions),
      (points => points.filter(() => random.value() > 0.5)),
      drawGrid(context)
    )(50);

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
