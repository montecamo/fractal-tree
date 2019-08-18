import Tree from './Tree';
import Slider from './Slider';
import './style.css';

const treeOptions = {
  depth: 10,
  length: 100,
  lengthRatio: 0.1,
  angle: 40,
  angleRatio: 0,
  tilt: 0,
};

const FractalTree = new Tree({
  color: '#ffd5d5',
  width: 900,
  height: 600,
  bottomPercentage: 20,
});

const sliderFactory = ({ value, min, max, step, property }) => {
  const slider = new Slider({
    value,
    min,
    max,
    step,
    name: property,
    containerClassName: 'slider-container',
    displayClassName: 'slider-name',
  });

  slider.addEventListener('input', e => {
    treeOptions[property] = +e.target.value;

    FractalTree.draw(treeOptions);
  });

  return slider;
};

const sliders = document.getElementById('sliders');

sliderFactory({
  property: 'depth',
  value: 10,
  min: 0,
  max: 15,
}).mount(sliders);

sliderFactory({
  property: 'angle',
  value: 40,
  min: 0,
  max: 180,
}).mount(sliders);

sliderFactory({
  property: 'length',
  value: 100,
  min: 0,
  max: 150,
}).mount(sliders);

sliderFactory({
  property: 'tilt',
  value: 0,
  min: -60,
  max: 60,
}).mount(sliders);

sliderFactory({
  property: 'angleRatio',
  value: 0,
  min: -180,
  max: 180,
  step: 1,
}).mount(sliders);

sliderFactory({
  property: 'lengthRatio',
  value: 0.1,
  min: -1,
  max: 1,
  step: 0.01,
}).mount(sliders);

FractalTree.mount(document.getElementById('root'));
FractalTree.draw(treeOptions);
