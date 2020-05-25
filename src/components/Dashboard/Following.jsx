/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import Avatar from "../../assets/images/male.png";

class Following extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			usersImages: [],
			usersID: [],
		};
	}

	componentDidMount() {
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			// Fixed
			firebase.db
				.ref(`following/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					const arr = Object.keys(userObject);
					this.setState({ usersID: arr });
					let folArr = [];
					firebase.db.ref("users").on("value", (snapshot) => {
						const user = snapshot.val();
						for (let i in arr) {
							folArr.push(user[arr[i]]);
						}
						this.setState({ users: folArr });
						let image = [];
						arr.map((x) => {
							firebase.storage
								.ref()
								.child(`images/${x}`)
								.getDownloadURL()
								.then((url) => {
									image.push(url);
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
			return <h5>You are following no one</h5>;
		}
		return (
			<div className="row">
				<div className="col">
					<div className="px px-lg-4">
						<h4 className="follow-head">
							People you are following
						</h4>
					</div>
					<div className="users-block px px-lg-4">
						{users.map((user, idx) => (
							<div className="post--card" key={user.email}>
								<div className="post--card__header">
									<img
										src={
											usersImages[idx]
												? usersImages[idx]
												: Avatar
										}
										className="post--avatar"
										alt=""
									/>
									<div>
										<a
											href={`/dashboard/users/${usersID[idx]}`}
											id="1"
										>
											<h6 className="profile--hero">
												{user.FullName}
											</h6>
											<p className="profile--hero__desc">
												@{user.UserName}
											</p>
										</a>
									</div>
									<button className="btn btn-sm btn-primary">
										<a
											href={`/dashboard/users/${usersID[idx]}`}
											className="white"
										>
											PROFILE
										</a>
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withFirebase(Following);
