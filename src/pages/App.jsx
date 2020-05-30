/** @format */

import React, { Component } from "react";
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import Dashboard from "./Dashboard";
import { withAuthentication } from "../components/Session";
import CreateProfile from "./CreateProfile";

class App extends Component {
	render() {
		return (
			<Router>
				<SignIn path='/' />
				<SignUp path='/register' />
				<ForgetPassword path='/forget-pw' />
				<Dashboard path='/dashboard' />
				<CreateProfile path='/create' />
			</Router>
		);
	}
}

export default withAuthentication(App);
