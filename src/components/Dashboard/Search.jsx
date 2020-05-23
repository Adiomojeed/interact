/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import Avatar from "../../assets/images/male.png";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			usersImages: [],
		};
	}

	componentDidMount() {
		let image = [];
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db.ref(`users`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				const user = Object.keys(userObject)
					.map((a) => ({
						...userObject[a],
						userID: a,
					}))
					.filter((a) => a.userID != authUser.uid);
				this.setState({ users: user });
				user.map((x) => {
					this.props.firebase.storage
						.ref()
						.child(`images/${x.userID}`)
						.getDownloadURL()
						.then((url) => {
							image.push(url);
						});
				});
				this.setState({ usersImages: image });
				console.log(user);
			});
		});
	}

	componentDidUpdate() {}
	render() {
		const { users, usersImages } = this.state;
		if (users.length === 0) {
			return <h4>No Friends to follow</h4>
		}
		return (
			<div className="row">
				<div className="col">
					<div className="users-block px px-lg-4">
						{users.map((user, idx) => (
							<div className="post--card" key={user.userID}>
								<div className="post--card__header">
									<img
										src={usersImages[0]}
										className="post--avatar"
										alt=""
									/>
									<div>
										<a
											href={`/dashboard/users/${user.userID}`}
											id="1"
										>
											<h6 className="profile--hero">
												{user.FullName}
											</h6>
											<p className="profile--hero__desc">
												@{user.UserName}
											</p>
										</a>
										<p className="profile--hero__follower">
											<span>10 Followers</span>
											<span>10 Following</span>
										</p>
									</div>
									<button className="btn btn-sm btn-primary">
										Follow
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

export default withFirebase(Search);
