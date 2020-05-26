/** @format */

import React from "react";
import Profile from "../components/Dashboard/Profile";
import Search from "../components/Dashboard/Search";
import Followers from "../components/Dashboard/Followers";
import Settings from "../components/Dashboard/Settings";
import { Router } from "@reach/router";
import {
	withAuthorization,
	withEmailVerification,
} from "../components/Session/index";
import TopNav from "../components/Dashboard/TopNav";
import SideBar from "../components/Dashboard/SideBar";
import EditProfile from "../components/Dashboard/EditProfile";
import CreatePost from "../components/Dashboard/CreatePost";
import UsersProfiles from "../components/Dashboard/UsersProfiles";
import Following from "../components/Dashboard/Following";

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
							<Router>
								<Profile path="/dashboard" />
								<EditProfile path="/dashboard/edit" />
								<CreatePost path="/dashboard/create" />
								<Search path="/dashboard/search" />
								<Followers path="/dashboard/followers" />
								<Following path="/dashboard/following" />
								<Settings path="/dashboard/settings" />
								<UsersProfiles path="/dashboard/users/:id" />
							</Router>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const condition = (authUser) => authUser != null;

export default withEmailVerification(withAuthorization(condition)(Dashboard));
