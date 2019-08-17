class Tree extends Canvas {
  constructor(options = {}) {
    super({
      strokeStyle: options.color,
      width: options.width,
      height: options.height,
    });

    this.height = options.height;
    this.width = options.width;
  }

  draw(depth, angle, length, ratio) {
    this.depth = depth;
    this.angle = angle;
    this.length = length;
    this.ratio = ratio;

    this.clear();

    const [x, y] = this.getInitialCoords();

    this.drawLine(x, y, x, y - length);
    this.drawLevel(x, y - length, 2, angle / 2);
  }

  getLength(depth) {
    return this.length - this.length * this.ratio * depth;
  }

  getInitialCoords() {
    return [this.width / 2, this.height];
  }

  getBranchTop(x, y, angle, radius) {
    const normalizedAngle = angle + 90;

    const radians = (normalizedAngle * Math.PI) / 180.0;

    const topX = x + radius * Math.cos(radians);
    const topY = y - radius * Math.sin(radians);

    return [topX, topY];
  }

  drawLevel(x, y, depth, angle) {
    if (depth > this.depth) return;

    const length = this.getLength(depth);

    const [leftX, leftY] = this.drawBranch(x, y, angle - this.angle, length);
    const [rightX, rightY] = this.drawBranch(x, y, angle, length);

    const newAngle = Math.abs(angle) + this.angle / 2;

    this.drawLevel(leftX, leftY, depth + 1, angle - this.angle / 2);
    this.drawLevel(rightX, rightY, depth + 1, angle + this.angle / 2);
  }

  drawBranch(x, y, angle, length) {
    const [endX, endY] = this.getBranchTop(x, y, angle, length);

    this.drawLine(x, y, endX, endY);

    return [endX, endY];
  }
}
