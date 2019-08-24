import throttle from 'lodash/throttle';

import Slider from './Slider';

class TreeSlider extends Slider {
  constructor(options) {
    const {
      value,
      min,
      max,
      step,
      onChange,
      displayName,
      animator,
      animationDuration = 1000,
    } = options;

    super({
      value,
      min,
      max,
      step,
      name: displayName,
      containerClassName: 'slider-container',
      displayClassName: 'slider-name',
      className: 'slider',
    });

    this.animating = false;
    this.onChange = onChange;
    this.animation = animator;
    this.animationDuration = animationDuration;
    this.value = value;

    this.animate = this.animate.bind(this);
    this.onInput = this.onInput.bind(this);

    if (this.animation) {
      this.onInput = throttle(this.onInput, 100);
    }

    this.addEventListener('input', this.onInput);
    this.addEventListener('mousedown', e => e.stopPropagation());

    this.onChange(this.value);
  }

  animate() {
    this.value = this.animation.value();

    this.onChange(this.value);

    if (this.animation.finished) {
      this.animating = false;
      return;
    }

    window.requestAnimationFrame(this.animate);
  }

  onInput(e) {
    const value = +e.target.value;

    if (!this.animation) {
      this.onChange(value);
      return;
    }

    this.animation.start(this.value, value, this.animationDuration);

    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  }
}

export default TreeSlider;
