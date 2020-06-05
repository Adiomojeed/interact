/** @format */

import React, { Component } from "react";
import Avatar from "../../assets/images/male.png";
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
					const arr =
						userObject === null ? [] : Object.keys(userObject);
					this.setState({ usersID: arr });
					let folArr = [];
					firebase.db.ref("users").on("value", (snapshot) => {
						const user = snapshot.val();
						for (let i in arr) {
							folArr.push(user[arr[i]]);
						}
						this.setState({ users: folArr });
						let image = new Object();
						arr.map((x) => {
							firebase.storage
								.ref()
								.child(`images/${x}`)
								.getDownloadURL()
								.then((url) => {
									image[x] = url;
									this.setState({ usersImages: image });
								});
						});
					});
				});
		});
	}

	render() {
		const { users, usersImages, usersID } = this.state;
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
