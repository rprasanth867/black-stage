import './App.css';
import 'reactflow/dist/style.css';
import GraphEditor from './views/graph/GraphEditor';
import ComponentSelector from './views/selector/ComponentSelector';
import { App as AntApp } from 'antd';
import EditNodeDialog from './views/edit_node/EditNodeDialog';
function App() {
  return (
    <AntApp>
      <div className="App" style={{display: 'flex', flexDirection:'row'}}>
        <GraphEditor/>
        <ComponentSelector/>
        <EditNodeDialog/>
      </div>
    </AntApp>
  );
}

export default App;
