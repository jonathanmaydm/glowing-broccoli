import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { CONNECT_MASSIVE } from "./reducers";
import config from "../config";
const massive = (window as any).massive;

export const CONNECT_MASSIVE_SUCCEEDED = "CONNECT_MASSIVE_SUCCEEDED";
export const CONNECT_MASSIVE_FAILED = "CONNECT_MASSIVE_FAILED";

function* catchMassive() {
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

export default catchMassive;
