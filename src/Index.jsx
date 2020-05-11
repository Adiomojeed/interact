/** @format */

import React from "react";
import ReactDOM from "react-dom";
import Theme from './components/Theme/Theme'
import './assets/styles/app.scss'

const App = () => {
    return (
        <Theme />
    )
}

ReactDOM.render(<App />, document.querySelector("#root"));
