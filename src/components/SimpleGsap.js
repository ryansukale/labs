import React, {useEffect} from 'react';
import gsap from 'gsap';

const createNode = name => 
  (props, children) => React.createElement(name, props, children);

const create =  {
  circle: createNode('circle'),
  line: createNode('line')
};

function growLine(target, timeline, stepSize = 80) {
  timeline.to(target, {
    duration: 1,
    attr: {x2: `+=${stepSize}`}
  });
}

function dropCircle(target, timeline, y = 50) {
  timeline.to(target, {
    duration: 1,
    y,
    ease: 'elastic'
  });
}

const source$ = {
  id: 'source-s',
  x1: 40,
  x2: 120,
  y1: 50,
  y2: 50,
  fill: 'none',
  stroke: '#979797',
  strokeWidth: 4,
  strokeLinecap: 'round'
};

const data1 = [
  {
    id: 'data-1-circle-1',
    cx: 0,
    cy: 0,
    r: 10,
    fill: 'indigo',
    stroke: '#979797'
  },
  {
    id: 'data-1-circle-2',
    cx: 0,
    cy: 0,
    r: 10,
    fill: 'indigo',
    stroke: '#979797'
  }
];

export default function SimpleGsap() {
  let tl = gsap.timeline();
  let currentScene = 0;
  const playScene = [
    tl => dropCircle('[id^="data-1"]', tl),
    tl => dropCircle('[id^="data-1-circle-2"]', tl, '+=50'),
    tl => growLine('#source-s', tl)
  ];
  function handleReplay() {
    tl.restart();
  }
  function handleProgress() {
    if (playScene[currentScene]) {
      playScene[currentScene](tl);
      currentScene++;
    }
  }

  useEffect(() => {
    gsap.set('[id^="data-1"]', {x: 120, y: -10})
  }, []);

  return (
    <>
      <div className="controls">
        <input type="button" id="progress" value="Progress" onClick={handleProgress} />
        <input type="button" id="replay" value="Replay" onClick={handleReplay}/>
      </div>

      <svg
        className="container"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 600">
        {create.line(source$)}
        {data1.map(d => create.circle({key: d.id, ...d}))}
      </svg>
    </>
  );
}
