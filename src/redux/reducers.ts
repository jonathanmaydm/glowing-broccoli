import { db } from "../db";
import { CONNECT_MASSIVE_SUCCEEDED, FETCH_DATA_SUCCEEDED } from "./sagas";

const initialState = {
  massive: null,
  db,
  editing: "",
  updates: [],
  data: []
};

export const CONNECT_MASSIVE = "CONNECT_MASSIVE";
export const FETCH_DATA = "FETCH_DATA";
export const QUEUE_UPDATE = "QUEUE_UPDATE";
export const DISCARD_CHANGES = "DISCARD_CHANGES";

export const connectMassive = () => {
  return {
    type: CONNECT_MASSIVE
  };
};

export const fetchData = table => {
  return {
    type: FETCH_DATA,
    payload: table
  };
};

export const queueUpdate = update => {
  return {
    type: QUEUE_UPDATE,
    payload: update
  };
};

export const discardChanges = () => {
  return {
    type: DISCARD_CHANGES
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_MASSIVE_SUCCEEDED:
      return { ...state, massive: action.payload };
    case FETCH_DATA_SUCCEEDED:
      return { ...state, data: action.payload };
    case QUEUE_UPDATE:
      return { ...state, updates: [...state.updates, action.payload] };
    case DISCARD_CHANGES:
      return { ...state, updates: [] };
  }
  return state;
};

export default reducer;
