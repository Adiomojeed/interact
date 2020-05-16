/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import SignOut from "./SignOut";
import Avatar from "../../assets/images/male.png";

class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: [],
			followers: "",
			following: "",
			avatar: Avatar,
		};
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`users/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ user: userObject });
				});
			this.props.firebase.db
				.ref(`followers/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ followers: userObject });
				});
			this.props.firebase.db
				.ref(`following/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ following: userObject });
				});
			this.props.firebase.storage
				.ref()
				.child(`images/${authUser.uid}`)
				.getDownloadURL()
				.then((url) => {
					this.setState({ avatar: url });
				});
		});
	}

	render() {
		const { user, followers, following, avatar } = this.state;
		return (
			<div className="siderow vh-sm-100">
				<div className="close">
					<i className="fas fa-times text-light" id="close"></i>
				</div>
				<div className="avatar-block">
					<div>
						<img src={avatar} className="avatar" alt="" />
					</div>
					<h5 className="text-light">{user.FullName}</h5>
					<p>@{user.UserName}</p>
					<p>
						<span>{followers.followers} Followers</span>
						<span>{following.following} Following</span>
					</p>
				</div>
				<div className="nav-list">
					<div className="nav-item">
						<NavLink
							to="/dashboard"
							activeClassName="nav-text"
							className="test"
						>
							<span>HOME</span>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink
							to="/dashboard/profile"
							activeClassName="nav-text"
							className="test"
						>
							<span>PROFILE</span>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink
							to="/dashboard/search"
							activeClassName="nav-text"
							className="test"
						>
							<span>SEARCH</span>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink
							to="/dashboard/followers"
							activeClassName="nav-text"
							className="test"
						>
							<span>FOLLOWERS</span>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink
							to="/dashboard/settings"
							activeClassName="nav-text"
							className="test"
						>
							<span>SETTINGS</span>
						</NavLink>
					</div>
				</div>
				<div className="signout-block">
					<SignOut />
				</div>
			</div>
		);
	}
}

export default withFirebase(SideBar);
