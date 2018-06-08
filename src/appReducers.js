import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import BeerReducer from './ducks/Beers/BeersReducer';
import AuthReducer from './ducks/Auth/AuthReducer';

const persistAuthConfig = {
    key: 'auth',
    storage,
    blacklist: ['error', 'logging']
};

const persistBeerConfig = {
    key: 'data',
    storage,
    blacklist: ['fetching', 'error']
};

const rootReducers = combineReducers({
    auth: persistReducer(persistAuthConfig, AuthReducer),
    data: persistReducer(persistBeerConfig, BeerReducer)
});

export default rootReducers;
