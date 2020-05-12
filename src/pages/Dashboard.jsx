/** @format */

import React from "react";
import Profile from "../components/Dashboard/Profile";
import { Route } from "react-router-dom";
import { withAuthorization } from "../components/Session/index";
import TopNav from "../components/Dashboard/TopNav";
import SideBar from "../components/Dashboard/SideBar";

const Dashboard = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm col-8 offset-2">
					<div className="row">
						<div
							className="col-sm col-3 vh-sm-100 col-3-fade"
							id="nav"
						>
							<SideBar />
						</div>
						<div className="col-sm vh-sm-100 col-9 col-9-display">
							<div>
								<TopNav />

								<h1>Dashboardvcgtyytdsaytytdtddy</h1>
								<Route
									path="/dashboard/profile"
									component={Profile}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Dashboard);
