/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/app.scss";
import {
	transitions,
	positions,
	Provider as AlertProvider,
	types,
} from "react-alert";
import App from "./pages/App";
import { Firebase, FirebaseContext } from "./components/Firebase/index";

const AlertTemplate = ({ message }) => {
	return (
		<div className="alert">
			<p>
				<i className="fas fa-check-circle"></i>
				{message}
			</p>
		</div>
	);
};

const options = {
	position: positions.TOP_RIGHT,
	type: types.SUCCESS,
	transition: transitions.FADE,
	timeout: 3000,
	offset: "30px",
};

const GlobalApp = () => {
	return (
		<>
			<AlertProvider template={AlertTemplate} {...options}>
				<App />
			</AlertProvider>
		</>
	);
};

const firebase = new Firebase();

ReactDOM.render(
	<FirebaseContext.Provider value={firebase}>
		<GlobalApp />
	</FirebaseContext.Provider>,
	document.querySelector("#root")
);
