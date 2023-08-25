import { combineReducers } from 'redux';

import catalog from './reducers/catalog';

const rootReducer = combineReducers({
    catalog
});

export default rootReducer;
