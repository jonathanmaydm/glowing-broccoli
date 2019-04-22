import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { CONNECT_MASSIVE, FETCH_DATA, SAVE_CHANGES } from "./reducers";
import config from "../config";
import { Database, Writable } from "massive";
const massive = (window as any).massive;

export const CONNECT_MASSIVE_SUCCEEDED = "CONNECT_MASSIVE_SUCCEEDED";
export const CONNECT_MASSIVE_FAILED = "CONNECT_MASSIVE_FAILED";
export const FETCH_DATA_SUCCEEDED = "FETCH_DATA_SUCCEEDED";

function* watchMassive() {
  yield takeEvery(CONNECT_MASSIVE, massiveSaga);
}

function* massiveSaga(action) {
  try {
    const massive: Database = yield call(
      (window as any).massive,
      config.CONNECTION_STRING
    );
    yield put({ type: CONNECT_MASSIVE_SUCCEEDED, payload: massive });
  } catch (e) {
    yield put({ type: CONNECT_MASSIVE_FAILED, payload: e });
  }
}

function* watchData() {
  yield takeLatest(FETCH_DATA, dataSaga);
}

function* dataSaga(action) {
  const massive = yield select(state => state.massive);
  if (massive) {
    const data = yield massive[action.payload].find();
    let payload = data.map(row => ({ original: { ...row }, updates: {} }));
    yield put({ type: FETCH_DATA_SUCCEEDED, payload });
  }
}

function* watchUpdates() {
  yield takeEvery(SAVE_CHANGES, updateSaga);
}

function* updateSaga(action) {
  const massive = yield select(state => state.massive);
  if (massive) {
    const updates = yield select(state =>
      state.data
        .filter(row => Object.keys(row.updates).length > 0)
        .map(row => ({ ...row.original, ...row.updates }))
    );
    console.log(updates);
    const promises = updates.map(update =>
      (massive[action.payload] as Writable).save(update, { build: false })
    );
    const results = yield Promise.all(promises);
    yield put({ type: FETCH_DATA, payload: action.payload });
  }
}

export default function* rootSaga() {
  yield all([watchData(), watchMassive(), watchUpdates()]);
}
