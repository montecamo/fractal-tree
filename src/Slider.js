class Slider {
  constructor(options) {
    this.slider = document.createElement('input');

    this.initDisplay(options.displayClassName);
    this.init(options);
  }

  init(options) {
    const { min, max, value, name, className, containerClassName } = options;

    this.slider.setAttribute('type', 'range');
    this.slider.setAttribute('min', min);
    this.slider.setAttribute('max', max);
    this.slider.setAttribute('value', value);
    this.slider.setAttribute('class', className);

    this.containerClassName = containerClassName;
    this.name = name;

    this.addEventListener('input', e => this.updateDisplay(e.target.value));
    this.updateDisplay(value);
  }

  initDisplay(className) {
    this.display = document.createElement('span');
    this.display.classList.add(className);
  }

  updateDisplay(value) {
    this.display.innerHTML = `${this.name}: ${value}`;
  }

  addEventListener(...args) {
    this.slider.addEventListener(...args);
  }

  removeEventListener(...args) {
    this.slider.removeEventListener(...args);
  }

  mount(elem) {
    const container = document.createElement('div');
    container.classList.add(this.containerClassName);

    container.appendChild(this.slider);
    container.appendChild(this.display);

    elem.appendChild(container);
  }
}

export default Slider;
