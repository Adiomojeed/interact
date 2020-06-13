/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/** @format */

import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { withFirebase } from "../Firebase";
import Avatar from "../../assets/images/male.png";
import FollowCard, { ButtonTwo } from "./components/FollowCard";

class Following extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			usersImages: [],
			usersID: [],
		};

		this.onHandleError = this.onHandleError.bind(this);
		this.onHandleUnFollow = this.onHandleUnFollow.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Following";
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			// Fixed
			firebase.db
				.ref(`following/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					const usersID =
						userObject === null ? [] : Object.keys(userObject);
					this.setState({ usersID });
					const followObject = [];
					firebase.db.ref("users").on("value", (snapshot) => {
						const user = snapshot.val();
						for (let i = 0; i < usersID.length; i++) {
							followObject.push(user[usersID[i]]);
						}
						this.setState({ users: followObject });
						const image = {};
						usersID.map((userID) => {
							firebase.storage
								.ref()
								.child(`images/${userID}`)
								.getDownloadURL()
								.then((url) => {
									image[userID] = url;
									this.setState({ usersImages: image });
								});
						});
					});
				});
		});
	}

	onHandleError(e) {
		e.target.src = Avatar;
	}

	onHandleUnFollow(e) {
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db.ref(`following/${authUser.uid}/${e}`).remove();
			firebase.db.ref(`followers/${e}/${authUser.uid}`).remove();
		});
	}

	render() {
		const { users, usersImages, usersID } = this.state;

		if (users.length === 0) {
			return (
				<div>
					<MoonLoader
						css="margin: 0 auto; margin-top: 20px"
						size={50}
						color={"#123abc"}
						loading={this.state.loading}
					/>
					<h6>You are following no one</h6>
				</div>
			);
		}
		return (
			<>
				<div>
					<h4 className="follow-head">People you are following</h4>
				</div>
				<div className="users-block">
					<div className="row">
						{users.map((user, idx) => (
							<FollowCard
								key={idx}
								idx={idx}
								user={user}
								usersID={usersID}
								usersImages={usersImages}
								Avatar={Avatar}
								onHandleError={this.onHandleError}
							>
								<ButtonTwo
									onHandleUnFollow={this.onHandleUnFollow}
									usersID={usersID}
									idx={idx}
								/>
							</FollowCard>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default withFirebase(Following);
