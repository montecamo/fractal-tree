import throttle from 'lodash/throttle';

import Tree from './Tree';
import Slider from './Slider';
import DragCapture from './DragCapture';
import ScrollCapture from './ScrollCapture';
import Animation from './Animation';
import './style.css';

const treeOptions = {
  leftOffset: 0,
  topOffset: window.innerHeight - 200,
};

const FractalTree = new Tree({
  color: '#ffd5d5',
  width: window.innerWidth,
  height: window.innerHeight,
});

const DragCaptor = new DragCapture(window, {
  x: treeOptions.leftOffset,
  y: treeOptions.topOffset,
  onChange: ([x, y]) => {
    treeOptions.leftOffset = x;
    treeOptions.topOffset = y;

    FractalTree.draw(treeOptions);
  },
});

const ScrollCaptor = new ScrollCapture(window, {
  x: treeOptions.leftOffset,
  y: treeOptions.topOffset,
  onChange: ([x, y]) => {
    treeOptions.leftOffset = x;
    treeOptions.topOffset = y;

    FractalTree.draw(treeOptions);
  },
});

const sliderFactory = ({ value, min, max, step, property, displayName }) => {
  const slider = new Slider({
    value,
    min,
    max,
    step,
    name: displayName,
    containerClassName: 'slider-container',
    displayClassName: 'slider-name',
    className: 'slider',
  });

  const animation = new Animation();

  let animating = false;

  const animate = () => {
    treeOptions[property] = animation.value();
    FractalTree.draw(treeOptions);

    if (animation.finished) {
      animating = false;
      return;
    }

    window.requestAnimationFrame(animate);
  };

  const onInput = e => {
    const from = treeOptions[property];
    const to = +e.target.value;

    animation.start(from, to, 1000);

    if (!animating) {
      animating = true;
      console.warn('do animate');
      animate();
    }
  };

  slider.addEventListener('input', throttle(onInput, 100));

  slider.addEventListener('mousedown', e => e.stopPropagation());

  treeOptions[property] = value;

  return slider;
};

const sliders = document.getElementById('sliders');

sliderFactory({
  property: 'depth',
  displayName: 'Depth',
  value: 10,
  min: 0,
  max: 15,
}).mount(sliders);

sliderFactory({
  property: 'angle',
  displayName: 'Angle\u00b0',
  value: 40,
  min: 0,
  max: 180,
}).mount(sliders);

sliderFactory({
  property: 'length',
  displayName: 'Length',
  value: 100,
  min: 0,
  max: 1000,
}).mount(sliders);

sliderFactory({
  property: 'tilt',
  displayName: 'Tilt\u00b0',
  value: 0,
  min: -60,
  max: 60,
}).mount(sliders);

sliderFactory({
  property: 'angleRatio',
  displayName: 'Angle ratio',
  value: 0,
  min: -180,
  max: 180,
  step: 1,
}).mount(sliders);

sliderFactory({
  property: 'lengthRatio',
  displayName: 'Length ratio',
  value: 0.1,
  min: -1,
  max: 1,
  step: 0.0001,
}).mount(sliders);

FractalTree.mount(document.getElementById('root'));
FractalTree.draw(treeOptions);

const animation = new Animation();

const animate = () => {
  treeOptions.lengthRatio = animation.value();

  FractalTree.draw(treeOptions);

  if (animation.finished) {
    return;
  }

  window.requestAnimationFrame(animate);
};

let animLoop = false;

function growUp(start) {
  if (!animLoop) return;

  animation.start(0.5, start, 6000);

  animation.onEnd(() => growDown(start));

  animate();
}

function growDown(start) {
  if (!animLoop) return;

  animation.start(start, 0.5, 5000);

  animation.onEnd(() => growUp(start));

  animate();
}

document.getElementById('animate').addEventListener('click', () => {
  animLoop = !animLoop;

  if (animLoop) {
    growDown(treeOptions.lengthRatio);
    document.getElementById('animate').innerHTML = 'Animating...';
  } else {
    document.getElementById('animate').innerHTML = 'Animate';
  }
});

DragCaptor.capture();
ScrollCaptor.capture();
