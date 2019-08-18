import './style.css';
import Tree from './Tree';

const FractalTree = new Tree({
  color: '#ffd5d5',
  width: 900,
  height: 600,
});

FractalTree.mount(document.getElementById('root'));
FractalTree.draw({
  depth: 10,
  angle: 40,
  length: 100,
  lengthRatio: 0.1,
  angleRatio: 50,
});
