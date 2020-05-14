/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import SignOut from "./SignOut";
import Avatar from "../../assets/images/male.png";

class SideBar extends React.Component {
	//constructor (props) {
	//	super (props)
	//	this.state = {
	//		user: []
	//	}
	//}

	//componentDidMount() {
	//	this.props.firebase.auth.onAuthStateChanged((authUser) =>
	//		this.props.firebase.db
	//			.ref(`users/${authUser.uid}`)
	//			.on("value", (snapshot) => {
	//				const usersObject = snapshot.val();
	//				this.setState({ user: usersObject});
	//			})
	//	);
	//}

	render() {
		//const {user} = this.state
		return (
			<div className="siderow vh-sm-100">
				<div className="close">
					<i className="fas fa-times text-light" id="close"></i>
				</div>
				<div className="avatar-block">
					<div>
						<img src={Avatar} className="avatar" alt="" />
					</div>
					<h5 className="text-light">Adio Mojeed</h5>
					<p>@codeLeaf</p>
					<p><span>100 Followers</span><span>100 Following</span></p>
				</div>
				<div className="nav-list">
					<div className="nav-item">
						<NavLink to="/dashboard" activeClassName="nav-text" className='test'>
							<span>HOME</span>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink to="/dashboard/profile" activeClassName="nav-text" className='test'>
							<span>PROFILE</span>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink to="/dashboard/search" activeClassName="nav-text" className='test'>
							<span>SEARCH</span>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink to="/dashboard/followers" activeClassName="nav-text" className='test'>
							<span>FOLLOWERS</span>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink to="/dashboard/settings" activeClassName="nav-text" className='test'>
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
