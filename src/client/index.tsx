import React from "react";
import ReactDOM, {hydrate} from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

function WrappedApp(): JSX.Element {
    return (
        <BrowserRouter >
            <App />
        </BrowserRouter>
    );
}

ReactDOM.hydrate(<WrappedApp/>, document.getElementById("root"));