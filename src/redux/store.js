import { createStore } from "redux";
import { app } from "./reducers";

const store = createStore(
    app,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
