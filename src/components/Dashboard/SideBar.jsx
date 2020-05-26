/** @format */

import React from "react";
import { Link } from "@reach/router";
import { withFirebase } from "../Firebase/index";
import SignOut from "./SignOut";
import Avatar from "../../assets/images/male.png";

const isActive = ({ isCurrent }) => {
	return isCurrent ? { className: "active" } : {};
};

const NavLink = (props) => <Link getProps={isActive} {...props} />;

class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: [],
			followers: "",
			following: "",
			avatar: Avatar,
		};

		this.onHandleError = this.onHandleError.bind(this)
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
					let arr = [];
					Object.keys(userObject).map((a) => arr.push(a));
					this.setState({ followers: arr });
				});
			this.props.firebase.db
				.ref(`following/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					let arr = [];
					Object.keys(userObject).map((a) => arr.push(a));
					this.setState({ following: arr });
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

	onHandleError() {
		this.setState({ avatar: Avatar });
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
						<img src={avatar} className="avatar" alt="" onError={this.onHandleError} />
					</div>
					<h4 className="text-light">{user.FullName}</h4>
					<small className="name">@{user.UserName}</small>
					<small>
						<a href="/dashboard/followers">
							<span>{followers.length} Followers</span>
						</a>
						<a href="/dashboard/following">
							<span>{following.length} Following</span>
						</a>
					</small>
				</div>
				<ul className="nav-list">
					<li>
						<NavLink to="/dashboard">PROFILE</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/search">
							PEOPLE YOU MAY FOLLOW
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/followers">FOLLOWERS</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/following">FOLLOWING</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/settings">SETTINGS</NavLink>
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
