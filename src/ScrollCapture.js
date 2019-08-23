class ScrollCapture {
  constructor(elem = window, options) {
    const { x, y, onChange } = options;

    this.onChange = onChange;
    this.elem = elem;

    this.x = x;
    this.y = y;

    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  onMouseWheel(e) {
    if (e.ctrlKey) return;

    this.x -= e.deltaX;
    this.y -= e.deltaY;

    this.onChange([this.x, this.y]);
  }

  capture() {
    this.elem.addEventListener('wheel', this.onMouseWheel);
  }

  stop() {
    this.elem.removeEventListener('wheel', this.onMouseWheel);
  }
}

export default ScrollCapture;
