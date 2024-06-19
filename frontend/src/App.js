import './App.scss';

import data from './data';

import Header from './components/header/header';

import Tree from './components/Tree/Tree';
import D3Tree from './components/d3Tree/d3Tree';

function App() {
  return (
    <div className='App'>
      <Header />
      <Tree
        data={data}
        width={window.innerWidth * 5}
        height={window.innerHeight}
      />
    </div>
  );
}

export default App;
