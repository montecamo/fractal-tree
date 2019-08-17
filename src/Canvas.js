class Canvas {
  constructor(options = {}) {
    this.canvas = document.createElement('canvas');

    this.ctx = this.canvas.getContext('2d');
    this.options = options;

    this.initCanvas(this.canvas, options);
  }

  initCanvas(canvas, options) {
    const { width, height } = options;

    this.canvas.width = width;
    this.canvas.height = height;
  }

  initCtx() {
    const {
      lineJoin = 'round',
      lineCap = 'round',
      lineWidth = 2,
      strokeStyle = '#ffd5d5',
    } = this.options;

    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineJoin = lineJoin;
    this.ctx.lineCap = lineCap;
  }

  /**
   * @public
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @public
   */
  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();

    this.initCtx();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  /**
   *
   * @public
   */
  mount(elem) {
    elem.appendChild(this.canvas);
  }
}
