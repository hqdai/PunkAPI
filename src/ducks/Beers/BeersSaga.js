import { call, put, takeEvery } from 'redux-saga/effects';

import { fetchBeers, fetchFirstBrewed } from './BeersAPI';
import { BEERS_REQUESTED, BEERS_SUCCESS, BEERS_FAIL } from './BeersType';

export function* watcherBeersSaga() {
    yield takeEvery(BEERS_REQUESTED, workerBeersSaga);
}

function* workerBeersSaga() {
    try {
        const response = yield call(fetchBeers);
        //Add isFav props and set default value === false
        //Add typeof and set value is 'today'
        const lstBeers = response.data
            .map((obj) => {
                const returnObj = obj;
                returnObj.isFav = false;
                returnObj.typeof = 'today';
                return returnObj;
            });

        //add isFav props and set default value === false
        //Add typeof and set value is 'first'
        const responseFirstBrewed = yield call(fetchFirstBrewed);
        const lstBeersFirstBrewed = responseFirstBrewed.data
            .map((obj) => {
                const returnObj = obj;
                returnObj.isFav = false;
                returnObj.typeof = 'first';
                return returnObj;
            });

        //compare 2 array, if any item exist in both array, then
        //the newItem.typeOf = arr1.item.typeOf + | + arr2.item.typeOf
        let arr3 = [];
        lstBeers.forEach(home => {
            let share = false;
            lstBeersFirstBrewed.forEach(first => {
                if (first.id === home.id) {
                    share = true;
                    const newObj = first;
                    newObj.typeof = `${home.typeof}|${first.typeof}`;
                }
                if (!share) arr3.push(home);
            });
        });

        //convert array to Object then return
        arr3 = arr3.concat(lstBeersFirstBrewed)
        .reduce((result, item) => {
            const key = item.id;
            const returnObj = result;
            returnObj[key] = item;
            return returnObj;
        }, {});

        //dispatch a success action to the store with new list beers
        yield put({
            type: BEERS_SUCCESS,
            payload: { beers: arr3 }
        });
    } catch (err) {
        //dispatch a fail message to the store with err message
        yield put({
            type: BEERS_FAIL,
            payload: err
        });
    }
}

