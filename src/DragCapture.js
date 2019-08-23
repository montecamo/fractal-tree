class DragDelta {
  constructor(elem = window, options) {
    const { x, y, onChange } = options;

    this.onChange = onChange;
    this.elem = elem;

    this.x = x();
    this.y = y();

    this.getX = x;
    this.getY = y;

    this.reset = this.reset.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseMove(e) {
    this.deltaX = e.clientX - this.pressedX;
    this.deltaY = e.clientY - this.pressedY;

    this.onChange([this.x + this.deltaX, this.y + this.deltaY]);
  }

  onMouseDown(e) {
    this.pressedX = e.clientX;
    this.pressedY = e.clientY;
    this.x = this.getX();
    this.y = this.getY();

    this.elem.addEventListener('mousemove', this.onMouseMove);

    this.elem.addEventListener('mouseup', this.reset);
  }

  reset() {
    this.elem.removeEventListener('mousemove', this.onMouseMove);
    this.elem.removeEventListener('mouseup', this.reset);

    this.x += this.deltaX;
    this.y += this.deltaY;
  }

  capture() {
    this.elem.addEventListener('mousedown', this.onMouseDown);
  }

  stop() {
    this.elem.removeEventListener('mousedown', this.onMouseDown);
  }
}

export default DragDelta;
