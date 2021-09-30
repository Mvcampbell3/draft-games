import { combineReducers } from "redux";
import { appState } from "./appState";

const reducers = {
    appState,
};

export const app = combineReducers(reducers);
