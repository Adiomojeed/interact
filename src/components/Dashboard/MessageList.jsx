/** @format */

import React, { Component } from "react";
import Avatar from "../../assets/images/male.png";
import MoonLoader from "react-spinners/MoonLoader";
import { withFirebase } from "../Firebase";

class MessageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			usersImages: [],
			usersID: [],
		};
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
					let messengersID = [];
					const usersID =
						userObject === null ? [] : Object.keys(userObject);
					messengersID.push(usersID);
					let totalUsersObject = [];
					firebase.db
						.ref(`followers/${authUser.uid}`)
						.on("value", (snapshot) => {
							const userObject = snapshot.val();
							const usersID =
								userObject === null
									? []
									: Object.keys(userObject);
							messengersID.push(usersID);
						});
					messengersID = messengersID.reduce(
						(a, b) => a.concat(b),
						[]
					);
					messengersID = messengersID.filter(
						(a, b) => messengersID.indexOf(a) === b
					);
					this.setState({ usersID: messengersID });
					firebase.db.ref("users").on("value", (snapshot) => {
						const user = snapshot.val();
						for (let i in messengersID) {
							totalUsersObject.push(user[messengersID[i]]);
						}
						this.setState({ users: totalUsersObject });
						let image = new Object();
						messengersID.map((messengerID) => {
							firebase.storage
								.ref()
								.child(`images/${messengerID}`)
								.getDownloadURL()
								.then((url) => {
									image[messengerID] = url;
									this.setState({ usersImages: image });
								});
						});
					});
				});
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
				</div>
			);
		}
		return (
			<div className="px px-lg-5 messages--block">
				<h5>MESSAGES</h5>
				<div className="users-block">
					{users.map((user, idx) => (
						<a
							href={`/dashboard/messages/${usersID[idx]}`}
							key={idx}
						>
							<div className="post--card">
								<div className="post--card__header">
									<img
										src={usersImages[usersID[idx]]}
										className="post--avatar"
										alt=""
									/>
									<div>
										<h6 className="profile--hero">
											{user.FullName}
										</h6>
										<p className="profile--hero__desc">
											@{user.UserName}
										</p>
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		);
	}
}

export default withFirebase(MessageList);
