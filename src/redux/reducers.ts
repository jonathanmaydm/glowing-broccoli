import { db } from "../db";

const initialState = {
  massive: null,
  db,
  editing: "",
  updates: []
};

const CONNECT_MASSIVE = "CONNECT_MASSIVE";
const TOGGLE_EDIT = "TOGGLE_EDIT";
const QUEUE_UPDATE = "QUEUE_UPDATE";
const DISCARD_CHANGES = "DISCARD_CHANGES";

export const connectMassive = massive => {
  return {
    type: CONNECT_MASSIVE,
    payload: massive
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
    case CONNECT_MASSIVE:
      return { ...state, massive: action.payload };
    case TOGGLE_EDIT:
      return { ...state, editing: action.payload };

    case QUEUE_UPDATE:
      return { ...state, updates: [...state.updates, action.payload] };
    case DISCARD_CHANGES:
      return { ...state, updates: [] };
  }
  return state;
};

export default reducer;
