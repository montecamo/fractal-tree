import Canvas from './Canvas';

class Tree extends Canvas {
  constructor(options = {}) {
    super({
      strokeStyle: options.color,
      width: options.width,
      height: options.height,
    });

    this.init(options);
  }

  setProperty(propName, value) {
    this[propName] = value === undefined ? this[propName] : value;
  }

  init(options) {
    const {
      width,
      height,
      depth,
      angle,
      length,
      lengthRatio,
      angleRatio,
      tilt,
      topOffset,
      leftOffset,
    } = options;

    this.setProperty('width', width);
    this.setProperty('height', height);
    this.setProperty('topOffset', topOffset);
    this.setProperty('leftOffset', leftOffset);
    this.setProperty('depth', depth);
    this.setProperty('angle', angle);
    this.setProperty('length', length);
    this.setProperty('lengthRatio', lengthRatio);
    this.setProperty('angleRatio', angleRatio);
    this.setProperty('tilt', tilt);

    this.updateDimensions(this.width, this.height);
  }

  draw(options = {}) {
    this.init(options);

    this.clear();

    const [x, y] = this.getInitialCoords();

    this.drawLine(x, y, x, y - this.length);
    this.drawLevel(x, y - this.length, 1, this.tilt + this.angle / 2);
  }

  getLength(depth) {
    if (this.length - this.length * this.lengthRatio * depth <= 0) return 0;

    return this.length - this.length * this.lengthRatio * depth;
  }

  getInitialCoords() {
    return [this.width / 2 + this.leftOffset, this.topOffset];
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

    const newAngle = this.angleRatio + this.angle / 2;

    this.drawLevel(leftX, leftY, depth + 1, this.tilt + angle - newAngle);
    this.drawLevel(rightX, rightY, depth + 1, this.tilt + angle + newAngle);
  }

  drawBranch(x, y, angle, length) {
    const [endX, endY] = this.getBranchTop(x, y, angle, length);

    this.drawLine(x, y, endX, endY);

    return [endX, endY];
  }

  get(prop) {
    return this[prop];
  }
}

export default Tree;
