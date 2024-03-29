/** @format */

import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { withFirebase } from "../Firebase";
import Avatar from "../../assets/images/male.png";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			followedID: [],
			users: [],
			usersImages: [],
			followers: [],
			following: [],
			followed: false,
		};

		this.onHandleFollow = this.onHandleFollow.bind(this);
		this.onHandleError = this.onHandleError.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract";
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			// Fixed
			firebase
				.user(`following/${authUser.uid}`)
				.on("value", (snapshot) => {
					const usersObject = snapshot.val();
					const followedID =
						usersObject === null ? [] : Object.keys(usersObject);
					this.setState({ followedID });
					firebase.db.ref(`users`).on("value", (snapshot) => {
						let usersObject = snapshot.val();
						usersObject = Object.keys(usersObject)
							.map((userID) => ({
								...usersObject[userID],
								userID,
							}))
							.filter(
								(userObject) =>
									userObject.userID != authUser.uid &&
									this.state.followedID.includes(
										userObject.userID
									) === false
							);
						this.setState({ users: usersObject });
						const image = {};
						usersObject.map((userObject) => {
							firebase.storage
								.ref()
								.child(`images/${userObject.userID}`)
								.getDownloadURL()
								.then((url) => {
									image[userObject.userID] = url;
									this.setState({ usersImages: image });
								});
						});
					});
				});

			// Fixed
			firebase.db.ref(`followers`).on("value", (snapshot) => {
				const usersObject = snapshot.val();
				delete usersObject[authUser.uid];
				this.setState({ followers: usersObject });
			});
			// correct
			firebase.db.ref(`following`).on("value", (snapshot) => {
				const usersObject = snapshot.val();
				delete usersObject[authUser.uid];
				this.setState({ following: usersObject });
			});
		});
	}

	onHandleError(e) {
		e.target.src = Avatar;
	}

	onHandleFollow(e) {
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db.ref(`following/${authUser.uid}/${e}`).set("followed");
			firebase.db.ref(`followers/${e}/${authUser.uid}`).set("following");
		});
	}

	render() {
		const { users, usersImages, followers, following } = this.state;
		if (usersImages.length === 0) {
			return (
				<div>
					<MoonLoader
						css="margin: 0 auto; margin-top: 20px"
						size={50}
						color={"#123abc"}
						loading={this.state.loading}
					/>
					<h6>No suggested follower</h6>
				</div>
			);
		}
		return (
			<>
				<div className="px px-lg-5 px-xl-0">
					<h5 className="follow-head d-none-rev">
						Suggested to follow
					</h5>
					<div className="users-block">
						{users.map((user) => (
							<div className="post--card" key={user.userID}>
								<div className="post--card__header">
									<img
										src={
											usersImages[user.userID]
												? usersImages[user.userID]
												: Avatar
										}
										onError={this.onHandleError}
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

									<button
										className="btn btn-sm btn-primary"
										onClick={() => {
											this.onHandleFollow(user.userID);
										}}
									>
										FOLLOW
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default withFirebase(Search);
