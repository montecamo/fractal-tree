const FractalTree = new Tree({
  color: '#ffd5d5',
  width: 900,
  height: 600,
});

FractalTree.mount(document.getElementById('root'));
FractalTree.draw(10, 40, 100, 0.1);
