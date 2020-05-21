/** @format */

import React from "react";
import Profile from "../components/Dashboard/Profile";
import Home from "../components/Dashboard/Home";
import Search from "../components/Dashboard/Search";
import Followers from "../components/Dashboard/Followers";
import Settings from "../components/Dashboard/Settings";
import { Route } from "react-router-dom";
import { withAuthorization } from "../components/Session/index";
import TopNav from "../components/Dashboard/TopNav";
import SideBar from "../components/Dashboard/SideBar";
import EditProfile from "../components/Dashboard/EditProfile";
import CreatePost from "../components/Dashboard/CreatePost";

const Dashboard = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col col-xl-9 offset-xl">
					<div className="row">
						<div
							className="col col-lg-3 vh-100 sidebar-block"
							id="nav"
						>
							<SideBar />
						</div>
						<div className="col col-lg-9 vh-100 px-lg">
							<TopNav />
							<Route exact path="/dashboard" component={Home} />
							<Route
								path="/dashboard/profile"
								component={Profile}
							/>
							<Route
								path="/dashboard/edit"
								component={EditProfile}
							/>
							<Route
								path="/dashboard/create"
								component={CreatePost}
							/>
							<Route
								path="/dashboard/search"
								component={Search}
							/>
							<Route
								path="/dashboard/followers"
								component={Followers}
							/>
							<Route
								path="/dashboard/settings"
								component={Settings}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(Dashboard);
