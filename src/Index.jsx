/** @format */

import React from "react";
import ReactDOM from "react-dom";
import Theme from "./components/Theme/Theme";
import "./assets/styles/app.scss";
import App from "./pages/App";
import {
	Firebase,
	FirebaseContext,
	auth,
	db,
} from "./components/Firebase/index";
import {
	transitions,
	positions,
	Provider as AlertProvider,
	types,
} from "react-alert";

const AlertTemplate = ({ message }) => {
	return (
		<div className="alert">
			<p><i className="fas fa-check-circle"></i>{message}</p>
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
				<Theme />
				<App />
			</AlertProvider>
		</>
	);
};

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase(auth, db)}>
		<GlobalApp />
	</FirebaseContext.Provider>,
	document.querySelector("#root")
);
