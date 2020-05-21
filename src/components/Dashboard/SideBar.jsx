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
			<div className="siderow">
				<div className="close">
					<i className="fas fa-times text-light" id="close"></i>
				</div>
				<div className="avatar-block">
					<div>
						<img src={avatar} className="avatar" alt="" />
					</div>
					<h4 className="text-light">{user.FullName}</h4>
					<small className="name">@{user.UserName}</small>
					<small>
						<span>{followers.followers} Followers</span>
						<span>{following.following} Following</span>
					</small>
				</div>
				<ul className="nav-list">
					<li>
						<NavLink exact to="/dashboard" activeClassName="active">
							HOME
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/profile"
							activeClassName="active"
						>
							PROFILE
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/search"
							activeClassName="active"
						>
							SEARCH
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/followers"
							activeClassName="active"
						>
							FOLLOWERS
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/settings"
							activeClassName="active"
						>
							SETTINGS
						</NavLink>
					</li>
				</ul>
				<div className="signout-block">
					<SignOut />
				</div>
			</div>
		);
	}
}

export default withFirebase(SideBar);
