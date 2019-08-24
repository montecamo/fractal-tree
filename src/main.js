import Tree from './Tree';
import TreeSlider from './TreeSlider';
import DragCapture from './DragCapture';
import ScrollCapture from './ScrollCapture';
import ZoomCapture from './ZoomCapture';
import Animation from './Animation';
import './style.css';

let animations = true;

const $animate = document.getElementById('animate');
const $animateSwitch = document.getElementById('animate-switch');
const $sliders = document.getElementById('sliders');
let sliders = [];

const FractalTree = new Tree({
  color: '#ffd5d5',
  width: window.innerWidth,
  height: window.innerHeight,
  leftOffset: 0,
  topOffset: window.innerHeight - 200,
  depth: 10,
  angle: 40,
  length: 100,
  tilt: 0,
  angleRatio: 0,
  lengthRatio: 0.1,
});

const DragCaptor = new DragCapture(window, {
  x: () => FractalTree.get('leftOffset'),
  y: () => FractalTree.get('topOffset'),
  onChange: ([x, y]) => {
    FractalTree.draw({
      leftOffset: x,
      topOffset: y,
    });
  },
});

const ScrollCaptor = new ScrollCapture(window, {
  onChange: ([deltaX, deltaY]) => {
    FractalTree.draw({
      leftOffset: FractalTree.get('leftOffset') - deltaX,
      topOffset: FractalTree.get('topOffset') - deltaY,
    });
  },
});

const ZoomCaptor = new ZoomCapture(window, {
  zoom: FractalTree.get('length'),
  onChange: zoom => {
    FractalTree.draw({
      length: zoom,
    });
  },
});

const sliderDrawer = prop => value => {
  FractalTree.draw({
    [prop]: value,
  });
};

const initSliders = () => {
  sliders.push(
    new TreeSlider({
      property: 'depth',
      displayName: 'Depth',
      value: FractalTree.get('depth'),
      min: 0,
      max: 15,
      onChange: sliderDrawer('depth'),
    }).mount($sliders),
  );

  sliders.push(
    new TreeSlider({
      property: 'angle',
      displayName: 'Angle\u00b0',
      value: FractalTree.get('angle'),
      min: 0,
      max: 180,
      animator: animations && new Animation(),
      onChange: sliderDrawer('angle'),
    }).mount($sliders),
  );

  sliders.push(
    new TreeSlider({
      property: 'length',
      displayName: 'Length',
      value: FractalTree.get('length'),
      min: 0,
      max: 1000,
      animator: animations && new Animation(),
      onChange: sliderDrawer('length'),
    }).mount($sliders),
  );

  sliders.push(
    new TreeSlider({
      property: 'tilt',
      displayName: 'Tilt\u00b0',
      value: FractalTree.get('tilt'),
      min: -60,
      max: 60,
      animator: animations && new Animation(),
      onChange: sliderDrawer('tilt'),
    }).mount($sliders),
  );

  sliders.push(
    new TreeSlider({
      property: 'angleRatio',
      displayName: 'Angle ratio',
      value: FractalTree.get('angleRatio'),
      min: -180,
      max: 180,
      step: 1,
      animator: animations && new Animation(),
      onChange: sliderDrawer('angleRatio'),
    }).mount($sliders),
  );

  sliders.push(
    new TreeSlider({
      property: 'lengthRatio',
      displayName: 'Length ratio',
      value: FractalTree.get('lengthRatio'),
      min: -1,
      max: 1,
      step: 0.001,
      animator: animations && new Animation(),
      onChange: sliderDrawer('lengthRatio'),
    }).mount($sliders),
  );
};

const animation = new Animation();

let animLoop = false;
let startValue = FractalTree.get('lengthRatio');

const animateGrow = cb => {
  FractalTree.draw({
    lengthRatio: animation.value(),
  });

  if (animation.finished) {
    cb();
    return;
  }

  window.requestAnimationFrame(() => animateGrow(cb));
};

function growUp() {
  if (!animLoop) return;

  animation.start(0.5, startValue, 6000);

  animateGrow(growDown);
}

function growDown() {
  if (!animLoop) return;

  animation.start(startValue, 0.5, 5000);

  animateGrow(growUp);
}

$animate.addEventListener('click', () => {
  animLoop = !animLoop;

  if (animLoop) {
    startValue = FractalTree.get('lengthRatio');

    growDown();

    $animate.innerHTML = 'Animating...';
  } else {
    animation.finish();

    window.requestAnimationFrame(() => {
      FractalTree.draw({
        lengthRatio: startValue,
      });
    });

    document.getElementById('animate').innerHTML = 'Animate';
  }
});

$animateSwitch.addEventListener('click', () => {
  animations = !animations;

  sliders.forEach(slider => {
    slider.finishAnimation();
    slider.unmount();
  });

  sliders = [];

  $animateSwitch.innerHTML = `Animations: ${animations ? 'on' : 'off'}`;

  initSliders();
});

FractalTree.mount(document.getElementById('root'));
FractalTree.draw();

window.addEventListener('resize', () => {
  FractalTree.draw({
    width: window.innerWidth,
    height: window.innerHeight,
  });
});

initSliders();
$animateSwitch.innerHTML = `Animations: ${animations ? 'on' : 'off'}`;

DragCaptor.capture();
ScrollCaptor.capture();
ZoomCaptor.capture();
