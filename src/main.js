import 'nouislider/distribute/nouislider.css';
import noUiSlider from 'nouislider';

import Tree from './Tree';
import './style.css';

const treeOptions = {
  depth: 10,
  length: 100,
  lengthRatio: 0.1,
  angle: 40,
  angleRatio: 50,
  tilt: 0,
};

const FractalTree = new Tree({
  color: '#ffd5d5',
  width: 900,
  height: 600,
});

const sliderFactory = (
  container,
  { start, min, max, step, property, formatter },
) => {
  const slider = document.createElement('div');
  slider.classList.add('slider');

  const sliderName = document.createElement('span');
  sliderName.innerHTML = property;
  sliderName.classList.add('slider-name');

  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('slider-container');

  noUiSlider.create(slider, {
    start: [start],
    step,
    format: {
      to: formatter,
      from: formatter,
    },
    tooltips: [true],
    range: {
      min: [min],
      max: [max],
    },
  });

  slider.noUiSlider.on('update', (values, handle) => {
    treeOptions[property] = values[handle];

    console.warn(treeOptions);
    FractalTree.draw(treeOptions);
  });

  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(sliderName);

  container.appendChild(sliderContainer);
};

const sliders = document.getElementById('sliders');

sliderFactory(sliders, {
  property: 'depth',
  start: 10,
  min: 0,
  max: 15,
  step: 1,
  formatter: Math.round,
});
sliderFactory(sliders, {
  property: 'angle',
  start: 40,
  min: 0,
  max: 180,
  step: 1,
  formatter: Math.round,
});
sliderFactory(sliders, {
  property: 'length',
  start: 100,
  min: 0,
  max: 150,
  step: 1,
  formatter: Math.round,
});
sliderFactory(sliders, {
  property: 'tilt',
  start: 0,
  min: -40,
  max: 40,
  step: 1,
  formatter: Math.round,
});
sliderFactory(sliders, {
  property: 'angleRatio',
  start: 0,
  min: -10,
  max: 10,
  step: 1,
  formatter: Math.round,
});

FractalTree.mount(document.getElementById('root'));
FractalTree.draw(treeOptions);
