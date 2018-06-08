import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducers from './appReducers';
import appSagas from './appSagas';


//import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     //stateReconciler: hardSet,
// };

//const pReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();
const appStore = createStore(rootReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(appSagas);

persistStore(appStore);

export { appStore };
//export const persistor =

