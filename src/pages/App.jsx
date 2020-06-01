/** @format */

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import Dashboard from "./Dashboard";
import { withAuthentication } from "../components/Session";
import CreateProfile from "./CreateProfile";

class App extends Component {
	render() {
		return (
			<Router forceRefresh={true}>
				<Route exact path="/" component={SignIn} />
				<Route path="/register" component={SignUp} />
				<Route path="/forget-pw" component={ForgetPassword} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/create" component={CreateProfile} />
			</Router>
		);
	}
}

export default withAuthentication(App);
