import { combineReducers } from 'redux';
import BeerReducer from './ducks/Beers/BeersReducer';
import AuthReducer from './ducks/Auth/AuthReducer';

const rootReducers = combineReducers({
    auth: AuthReducer,
    data: BeerReducer
});

export default rootReducers;
