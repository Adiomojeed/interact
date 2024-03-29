/** @format */

import React from "react";
import { Router } from "@reach/router";
import Profile from "../components/Dashboard/Profile";
import Search from "../components/Dashboard/Search";
import Followers from "../components/Dashboard/Followers";
import Settings from "../components/Dashboard/Settings";
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
import CommentDetails from "../components/Dashboard/CommentDetails";
import MessageList from "../components/Dashboard/MessageList";
import MessagingPage from "../components/Dashboard/MessagingPage";
import Home from "../components/Dashboard/Home";

const Dashboard = () => {
	return (
		<div className="container">
			<div className="row">
				<div
					className="col col-lg-3 col-xl-2 vh-100 sidebar-block"
					id="nav"
				>
					<SideBar />
				</div>
				<div className="col col-lg-9 col-xl-10 vh-100">
					<TopNav />
					<div className="row">
						<div className="col col-xl-8 overflow">
							<div className="row px">
								<div className="col">
									<Router>
										<Home path="/dashboard" />
										<Profile path="/dashboard/profile" />
										<EditProfile path="/dashboard/edit" />
										<CreatePost path="/dashboard/create" />
										<Search path="/dashboard/search" />
										<Followers path="/dashboard/followers" />
										<Following path="/dashboard/following" />
										<Settings path="/dashboard/settings" />
										<UsersProfiles path="/dashboard/users/:id" />
										<CommentDetails path="/dashboard/posts/:uid/:pid" />
										<MessageList path="/dashboard/messages" />
										<MessagingPage path="/dashboard/messages/:mid" />
									</Router>
								</div>
							</div>
						</div>
						<div className="col-lg-4 d-none overflow">
							<div className="row pr">
								<div className="col">
									<h6 className="suggest">
										Suggested to follow
									</h6>
									<Search />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const condition = (authUser) => authUser != null;

export default withEmailVerification(withAuthorization(condition)(Dashboard));
