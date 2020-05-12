/** @format */

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import Dashboard from "./Dashboard";
import { withAuthentication } from "../components/Session";

class App extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={SignIn} />
				<Route path="/register" component={SignUp} />
				<Route path="/forget-pw" component={ForgetPassword} />
				<Route path="/dashboard" component={Dashboard} />
			</Router>
		);
	}
}

export default withAuthentication(App);
