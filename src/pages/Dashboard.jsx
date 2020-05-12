/** @format */

import React from "react";
import SignOut from "../components/Dashboard/SignOut";
import Profile from "../components/Dashboard/Profile";
import { Route } from "react-router-dom";
import {withAuthorization} from "../components/Session/index";

const Dashboard = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h1>Dashboard</h1>
					<Route exact path="/dashboard" component={SignOut} />
					<Route path="/dashboard/profile" component={Profile} />
				</div>
			</div>
		</div>
	);
};

const condition = authUser => authUser != null

export default withAuthorization(condition)(Dashboard);
