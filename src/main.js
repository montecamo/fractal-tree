import Tree from './Tree';
import Slider from './Slider';
import './style.css';

const treeOptions = {
  leftOffset: 0,
  bottomOffset: 200,
};

const FractalTree = new Tree({
  color: '#ffd5d5',
  width: window.innerWidth,
  height: window.innerHeight,
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

  slider.addEventListener('input', e => {
    treeOptions[property] = +e.target.value;

    FractalTree.draw(treeOptions);
  });

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
  step: 0.001,
}).mount(sliders);

const onMouseDown = e => {
  const initialX = e.clientX;
  const initialY = e.clientY;

  const { leftOffset, bottomOffset } = treeOptions;

  const onMouseMove = e => {
    const deltaX = e.clientX - initialX;
    const deltaY = e.clientY - initialY;

    treeOptions.bottomOffset = bottomOffset - deltaY;
    treeOptions.leftOffset = leftOffset + deltaX;

    FractalTree.draw(treeOptions);
  };

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  window.addEventListener('mousemove', onMouseMove);

  window.addEventListener('mouseup', onMouseUp);
};

window.addEventListener('mousedown', onMouseDown);

FractalTree.mount(document.getElementById('root'));
FractalTree.draw(treeOptions);
