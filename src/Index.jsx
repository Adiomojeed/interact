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

const GlobalApp = () => {
	return (
		<>
			<Theme />
			<App />
		</>
	);
};

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase(auth, db)}>
		<GlobalApp />
	</FirebaseContext.Provider>,
	document.querySelector("#root")
);
