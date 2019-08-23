class ScrollCapture {
  constructor(elem = window, options) {
    const { zoom, onChange } = options;

    this.onChange = onChange;
    this.elem = elem;

    this.zoom = zoom;

    this.onMouseWheel = this.onMouseWheel.bind(this);
  }

  onMouseWheel(e) {
    if (!e.ctrlKey) return;

    this.zoom -= e.deltaY * 0.3;

    this.onChange(this.zoom);
  }

  capture() {
    this.elem.addEventListener('wheel', this.onMouseWheel);
  }

  stop() {
    this.elem.removeEventListener('wheel', this.onMouseWheel);
  }
}

export default ScrollCapture;
