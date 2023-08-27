import './App.css';
import 'reactflow/dist/style.css';
import GraphEditor from './views/graph/GraphEditor';
import ComponentSelector from './views/selector/ComponentSelector';
import { App as AntApp } from 'antd';
import EditNodeDialog from './views/edit_node/EditNodeDialog';
import { useSelector } from 'react-redux';
import { IReduxState } from './redux/store';
import { ReactFlowProvider } from 'reactflow';
function App() {
  const { edit } = useSelector((state:IReduxState)=> state.catalog);
  return (
    <AntApp>
      <ReactFlowProvider>
      <div className="App" style={{display: 'flex', flexDirection:'row'}}>
        <GraphEditor/>
        <ComponentSelector/>
        {edit && <EditNodeDialog/>}
      </div>
      </ReactFlowProvider>
    </AntApp>
  );
}

export default App;
