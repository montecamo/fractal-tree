import Tree from './Tree';
import TreeSlider from './TreeSlider';
import DragCapture from './DragCapture';
import ScrollCapture from './ScrollCapture';
import ZoomCapture from './ZoomCapture';
import Animation from './Animation';
import './style.css';

const treeOptions = {
  leftOffset: 0,
  topOffset: window.innerHeight - 200,
  length: 100,
};

const FractalTree = new Tree({
  color: '#ffd5d5',
  width: window.innerWidth,
  height: window.innerHeight,
});

const DragCaptor = new DragCapture(window, {
  x: () => treeOptions.leftOffset,
  y: () => treeOptions.topOffset,
  onChange: ([x, y]) => {
    FractalTree.draw({
      leftOffset: x,
      topOffset: y,
    });
  },
});

const ScrollCaptor = new ScrollCapture(window, {
  x: () => treeOptions.leftOffset,
  y: () => treeOptions.topOffset,
  onChange: ([deltaX, deltaY]) => {
    treeOptions.leftOffset -= deltaX;
    treeOptions.topOffset -= deltaY;

    FractalTree.draw({
      treeOptions,
    });
  },
});

const ZoomCaptor = new ZoomCapture(window, {
  zoom: treeOptions.length,
  onChange: zoom => {
    FractalTree.draw({
      length: zoom,
    });
  },
});

const sliders = document.getElementById('sliders');
const sliderDrawer = prop => value => {
  FractalTree.draw({
    [prop]: value,
  });
};

new TreeSlider({
  property: 'depth',
  displayName: 'Depth',
  value: 10,
  min: 0,
  max: 15,
  onChange: sliderDrawer('depth'),
}).mount(sliders);

new TreeSlider({
  property: 'angle',
  displayName: 'Angle\u00b0',
  value: 40,
  min: 0,
  max: 180,
  animator: new Animation(),
  onChange: sliderDrawer('angle'),
}).mount(sliders);

new TreeSlider({
  property: 'length',
  displayName: 'Length',
  value: 100,
  min: 0,
  max: 1000,
  animator: new Animation(),
  onChange: sliderDrawer('length'),
}).mount(sliders);

new TreeSlider({
  property: 'tilt',
  displayName: 'Tilt\u00b0',
  value: 0,
  min: -60,
  max: 60,
  animator: new Animation(),
  onChange: sliderDrawer('tilt'),
}).mount(sliders);

new TreeSlider({
  property: 'angleRatio',
  displayName: 'Angle ratio',
  value: 0,
  min: -180,
  max: 180,
  step: 1,
  animator: new Animation(),
  onChange: sliderDrawer('angleRatio'),
}).mount(sliders);

new TreeSlider({
  property: 'lengthRatio',
  displayName: 'Length ratio',
  value: 0.1,
  min: -1,
  max: 1,
  step: 0.0001,
  animator: new Animation(),
  onChange: sliderDrawer('lengthRatio'),
}).mount(sliders);

const animation = new Animation();

const animateGrow = () => {
  if (animation.finished) {
    return;
  }

  FractalTree.draw({
    lengthRatio: animation.value(),
  });

  window.requestAnimationFrame(animateGrow);
};

let animLoop = false;
let startValue = treeOptions.lengthRatio;

function growUp() {
  if (!animLoop) return;

  animation.start(0.5, startValue, 6000);

  animation.onEnd(() => growDown());

  animateGrow();
}

function growDown() {
  if (!animLoop) return;

  animation.start(startValue, 0.5, 5000);

  animation.onEnd(() => growUp());

  animateGrow();
}

document.getElementById('animate').addEventListener('click', () => {
  animLoop = !animLoop;

  if (animLoop) {
    startValue = treeOptions.lengthRatio;

    growDown();

    document.getElementById('animate').innerHTML = 'Animating...';
  } else {
    animation.finish();

    FractalTree.draw({
      lengthRatio: startValue,
    });

    document.getElementById('animate').innerHTML = 'Animate';
  }
});

FractalTree.mount(document.getElementById('root'));
FractalTree.draw(treeOptions);

DragCaptor.capture();
ScrollCaptor.capture();
ZoomCaptor.capture();
