import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';
import { LOGIN_FAIL, LOGIN_REQUESTED, LOGIN_SUCCESS } from './AuthType';

export function* watcherAuthSaga() {
    yield takeEvery(LOGIN_REQUESTED, workerAuthSaga);
}

function* workerAuthSaga(action) {
    try {
        const auth = firebase.auth();
        const result = yield call(
            [
                auth,
                auth.signInWithEmailAndPassword
            ],
            action.payload.email,
            action.payload.password
        );
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.user
        });
    } catch (err) {
        yield put({
            type: LOGIN_FAIL,
            payload: err
        });
    }
}
