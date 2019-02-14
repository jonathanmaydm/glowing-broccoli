import { db } from "../db";
import { CONNECT_MASSIVE_SUCCEEDED } from "./sagas";

const initialState = {
  massive: null,
  db,
  editing: "",
  updates: []
};

export const CONNECT_MASSIVE = "CONNECT_MASSIVE";
export const TOGGLE_EDIT = "TOGGLE_EDIT";
export const QUEUE_UPDATE = "QUEUE_UPDATE";
export const DISCARD_CHANGES = "DISCARD_CHANGES";

export const connectMassive = () => {
  return {
    type: CONNECT_MASSIVE
  };
};

export const toggleEdit = cell => {
  return {
    type: TOGGLE_EDIT,
    payload: cell
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
    case QUEUE_UPDATE:
      return { ...state, updates: [...state.updates, action.payload] };
    case DISCARD_CHANGES:
      return { ...state, updates: [] };
  }
  return state;
};

export default reducer;
