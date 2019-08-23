class Animation {
  constructor() {
    this.finished = true;
  }

  start(from, to, duration) {
    this.finished = false;
    this.startTime = Date.now();

    this.duration = duration;
    this.from = from;
    this.to = to;
  }

  value() {
    if (this.finished) return this.to;

    const progress = (Date.now() - this.startTime) / this.duration;

    if (progress >= 1) {
      this.finished = true;

      if (this.cb) {
        this.cb();
      }

      return this.to;
    }

    return this.from + (this.to - this.from) * progress * (2 - progress);
  }

  onEnd(cb) {
    this.cb = cb;
  }
}

export default Animation;
