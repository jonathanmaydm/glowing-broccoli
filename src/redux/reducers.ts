import { db } from "../db";
import { CONNECT_MASSIVE_SUCCEEDED, FETCH_DATA_SUCCEEDED } from "./sagas";

const initialState = {
  massive: null,
  db,
  editing: "",
  data: []
};

export const CONNECT_MASSIVE = "CONNECT_MASSIVE";
export const FETCH_DATA = "FETCH_DATA";
export const QUEUE_UPDATE = "QUEUE_UPDATE";
export const DISCARD_CHANGES = "DISCARD_CHANGES";
export const UPDATE_COLUMN = "UPDATE_COLUMN";
export const SAVE_CHANGES = "SAVE_CHANGES";

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

export const saveChanges = table => {
  return {
    type: SAVE_CHANGES,
    payload: table
  };
};

export const updateColumn = (column, row, data) => {
  return {
    type: UPDATE_COLUMN,
    payload: { column, row, data }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_MASSIVE_SUCCEEDED:
      return { ...state, massive: action.payload };
    case FETCH_DATA_SUCCEEDED:
      return { ...state, data: action.payload };
    case DISCARD_CHANGES: {
      const updates = state.data.map(row => ({
        original: row.original,
        updates: {}
      }));

      return { ...state, data: updates };
    }
    case UPDATE_COLUMN: {
      const updates = state.data.slice();
      if (action.payload.data === undefined) {
        delete updates[action.payload.row].updates[action.payload.column];
      } else {
        updates[action.payload.row].updates[action.payload.column] =
          action.payload.data || null;
      }
      return { ...state, data: updates };
    }
  }
  return state;
};

export default reducer;
