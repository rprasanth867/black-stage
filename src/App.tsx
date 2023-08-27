import './App.css';
import 'reactflow/dist/style.css';
import { App as AntApp } from 'antd';
import { useSelector } from 'react-redux';
import { ReactFlowProvider } from 'reactflow';

import { IReduxState } from './redux/store';
import EditNodeDialog from './views/edit_node/EditNodeDialog';
import GraphEditor from './views/graph/GraphEditor';
import ComponentSelector from './views/selector/ComponentSelector';
function App() {
    const { edit } = useSelector((state: IReduxState) => state.catalog);

    return (
        <AntApp>
            <ReactFlowProvider>
                <div
                    className = 'App'
                    style = {{ display: 'flex',
                        flexDirection: 'row' }}>
                    <GraphEditor />
                    <ComponentSelector />
                    {edit && <EditNodeDialog />}
                </div>
            </ReactFlowProvider>
        </AntApp>
    );
}

export default App;
