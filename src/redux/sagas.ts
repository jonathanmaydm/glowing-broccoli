import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { CONNECT_MASSIVE, FETCH_DATA } from "./reducers";
import config from "../config";
const massive = (window as any).massive;

export const CONNECT_MASSIVE_SUCCEEDED = "CONNECT_MASSIVE_SUCCEEDED";
export const CONNECT_MASSIVE_FAILED = "CONNECT_MASSIVE_FAILED";
export const FETCH_DATA_SUCCEEDED = "FETCH_DATA_SUCCEEDED";

function* watchMassive() {
  yield takeEvery(CONNECT_MASSIVE, massiveSaga);
}

function* massiveSaga(action) {
  try {
    const massive = yield call(
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
    yield put({ type: FETCH_DATA_SUCCEEDED, payload: data });
  }
}

export default function* rootSaga() {
  yield all([watchData(), watchMassive()]);
}
