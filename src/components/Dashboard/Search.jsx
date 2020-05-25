/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import Avatar from "../../assets/images/male.png";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			usersImages: [],
			followers: [],
			following: [],
			followed: false,
		};

		this.onHandleFollow = this.onHandleFollow.bind(this);
	}

	componentDidMount() {
		const { firebase, id } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			// Fixed
			firebase.db.ref(`users`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				const user = Object.keys(userObject)
					.map((a) => ({
						...userObject[a],
						userID: a,
					}))
					.filter((a) => a.userID != authUser.uid);
				this.setState({ users: user });
				let image = [];
				user.map((x) => {
					firebase.storage
						.ref()
						.child(`images/${x.userID}`)
						.getDownloadURL()
						.then((url) => {
							image.push(url);
							this.setState({ usersImages: image });
						});
				});
			});
			// Fixed
			firebase.db.ref(`followers`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				delete userObject[authUser.uid];
				this.setState({ followers: userObject });
				let arr = [];
				arr.push(userObject);
			});
			// correct
			firebase.db.ref(`following`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				delete userObject[authUser.uid];
				this.setState({ following: userObject });
				let arr = [];
				arr.push(userObject);
			});
		});
	}

	onHandleFollow(e) {
		const { id, firebase } = this.props;
		const { followed } = this.state;
		firebase.auth.onAuthStateChanged((authUser) => {
			if (followed) {
				firebase.db.ref(`following/${authUser.uid}/${e}`).remove();
				firebase.db.ref(`followers/${e}/${authUser.uid}`).remove();
				window.location.reload();
			} else {
				firebase.db
					.ref(`following/${authUser.uid}/${e}`)
					.set("followed");
				firebase.db
					.ref(`followers/${e}/${authUser.uid}`)
					.set("following");
			}
		});
		this.setState({ followed: !this.state.followed });
	}

	render() {
		const { users, usersImages, followers, following } = this.state;
		if (usersImages.length === 0) {
			return <h4>No Friends to follow</h4>;
		}
		return (
			<div className="row">
				<div className="col">
					<div className="users-block px px-lg-4">
						{users.map((user, idx) => (
							<div className="post--card" key={user.userID}>
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
											<span>
												{Object.keys(
													followers
												).includes(user.userID)
													? Object.keys(
															followers[
																user.userID
															]
													  ).length
													: 0}{" "}
												Followers
											</span>
											<span>
												{Object.keys(
													following
												).includes(user.userID)
													? Object.keys(
															following[
																user.userID
															]
													  ).length
													: 0}{" "}
												Following
											</span>
										</p>
									</div>

									<button className="btn btn-sm btn-primary">
										<a
											href={`/dashboard/users/${user.userID}`}
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

export default withFirebase(Search);
