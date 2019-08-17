const FractalTree = new Tree({
  color: '#ffd5d5',
  width: 900,
  height: 600,
});

FractalTree.mount(document.getElementById('root'));
FractalTree.draw({ depth: 10, angle: 40, length: 100, ratio: 0.1, tilt: 20 });
