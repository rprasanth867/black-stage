import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'reactflow/dist/style.css';
import GraphEditor from './views/graph/GraphEditor';
import ComponentSelector from './views/selector/ComponentSelector';
import { App as AntApp } from 'antd';
function App() {
  return (
    <AntApp>
      <div className="App" style={{display: 'flex', flexDirection:'row'}}>
        <GraphEditor/>
        <ComponentSelector/>
      </div>
    </AntApp>
  );
}

export default App;
