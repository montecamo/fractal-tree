class ScrollCapture {
  constructor(elem = window, options) {
    const { onChange } = options;

    this.onChange = onChange;
    this.elem = elem;

    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  onMouseWheel(e) {
    if (e.ctrlKey) return;

    this.onChange([e.deltaX, e.deltaY]);
  }

  capture() {
    this.elem.addEventListener('wheel', this.onMouseWheel);
  }

  stop() {
    this.elem.removeEventListener('wheel', this.onMouseWheel);
  }
}

export default ScrollCapture;
