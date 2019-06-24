import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome";
import { App } from "./app";
import reducer from "./reducers";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

import "../public/normalize.css";

import "../public/style.css";
let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
