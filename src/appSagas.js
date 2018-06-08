import { fork, all } from 'redux-saga/effects';

import { watcherBeersSaga } from './ducks/Beers/BeersSaga';
import { watcherAuthSaga } from './ducks/Auth/AuthSaga';


export default function* appSagas() {
    try {
        yield all([
            fork(watcherBeersSaga),
            fork(watcherAuthSaga)
        ]);
    } catch (err) {
        console.log('sagaerror: ', err);
    }
}
