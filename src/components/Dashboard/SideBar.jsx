/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { withFirebase } from '../Firebase/index'
import SignOut from './SignOut'
//import Avatar from "../../../assets/images/male.png";

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

	render () {
		//const {user} = this.state 
		return (
			<div className="siderow vh-sm-100">
				<div className="close">
					<i className="fas fa-times text-light" id="close"></i>
				</div>
				<div className="avatar-block">
					<div>
						<h1>image</h1>
					</div>
					<h5 className="text-light text-center">
						DSC
					</h5>
					<p>name</p>
					<p><i className="fas fa-flag"></i>name</p>
				</div>
				<div className="nav-list">
					<div className="nav-item">
						<NavLink to="/dashboard" activeClassName="nav-it">
							<p className="nav-text">
								<i className="fas fa-home sidebar__icon"></i>HOME
							</p>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink to="/dashboard/members" activeClassName="nav-it">
							<p className="nav-text">
								<i className="fas fa-users sidebar__icon"></i>
								MEMBERS
							</p>
						</NavLink>
					</div>
					<div className="nav-item">
						<NavLink to="/dashboard/addmember" activeClassName="nav-it">
							<p className="nav-text">
								<i className="fas fa-user-plus sidebar__icon"></i>
								ADD MEMBERS
							</p>
						</NavLink>
					</div>
					
				</div>
				<SignOut />
			</div>
		);
	}
};

export default withFirebase(SideBar);