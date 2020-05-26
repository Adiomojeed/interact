/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import Avatar from "../../assets/images/male.png";

class UsersProfiles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userDetails: [],
			avatar: Avatar,
			followers: "",
			following: "",
			posts: [],
			liked: false,
			followed: false,
			presentPost: null,
		};

		this.onHandleClick = this.onHandleClick.bind(this);
		this.onHandleFollow = this.onHandleFollow.bind(this);
		this.onHandleError = this.onHandleError.bind(this)
	}

	componentWillMount() {
		document.title = "Intteract - Profile";
	}

	componentDidMount() {
		const { id, firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			// correct
			firebase.db.ref(`users/${id}`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				this.setState({ userDetails: userObject });
			});
			// correct
			firebase.db.ref(`followers/${id}`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				let arr = [];
				Object.keys(userObject).map((a) => arr.push(a));
				this.setState({ followers: arr });
				if (arr.includes(authUser.uid)) {
					this.setState({ followed: true });
				}
			});
			// correct
			firebase.db.ref(`following/${id}`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				let arr = [];
				Object.keys(userObject).map((a) => arr.push(a));
				this.setState({ following: arr });
			});
			// correct
			firebase.db.ref(`posts/${id}`).on("value", (snapshot) => {
				const postObject = snapshot.val();
				let test = Object.keys(postObject).map((a) => ({
					...postObject[a],
					postID: a,
				}));

				let newTest = Object.keys(test).map((i) => test[i].likes);

				let i = 0;
				for (i; i < newTest.length; i++) {
					let b = Object.keys(newTest[i]);
					test[i].likes = b;
					if (b.includes(authUser.uid)) {
						this.setState({ liked: true });
					}
				}
				this.setState({ posts: test });
			});
			// correct
			firebase.storage
				.ref()
				.child(`images/${id}`)
				.getDownloadURL()
				.then((url) => {
					this.setState({ avatar: url });
				});
		});
	}

	onHandleError() {
		this.setState({ avatar: Avatar });
	}

	onHandleClick(e) {
		const { firebase, id } = this.props;
		const { liked } = this.state;
		firebase.auth.onAuthStateChanged((authUser) => {
			if (liked) {
				firebase.db
					.ref(`posts/${id}/${e.postID}/likes/${authUser.uid}`)
					.remove();
				firebase.db
					.ref(`posts/${id}/${e.postID}/likes`)
					.on("value", (snapshot) => {
						let a = snapshot.val();
						if (a === null) {
							firebase.db
								.ref(`posts/${id}/${e.postID}/likes`)
								.set("");
						}
					});
			} else {
				firebase.db
					.ref(`posts/${id}/${e.postID}/likes/${authUser.uid}`)
					.set("liked");
			}
		});
		this.setState({ liked: !this.state.liked });
	}

	onHandleFollow() {
		const { id, firebase } = this.props;
		const { followed } = this.state;

		firebase.auth.onAuthStateChanged((authUser) => {
			if (followed) {
				firebase.db.ref(`following/${authUser.uid}/${id}`).remove();
				firebase.db.ref(`followers/${id}/${authUser.uid}`).remove();
				window.location.reload();
			} else {
				firebase.db
					.ref(`following/${authUser.uid}/${id}`)
					.set("followed");
				firebase.db
					.ref(`followers/${id}/${authUser.uid}`)
					.set("following");
			}
		});
		this.setState({ followed: !this.state.followed });
	}

	render() {
		const {
			userDetails,
			avatar,
			followers,
			following,
			posts,
			followed,
		} = this.state;
		return (
			<div className="row">
				<div className="col px">
					<div className="card"></div>
					<div className="profile--card">
						<a href={avatar}>
							<img
								src={avatar}
								className="profile--avatar"
								alt=""
								onError={this.onHandleError}
							/>
						</a>
						<div className="profile--header">
							<div>
								<h5 className="profile--hero">
									{userDetails.FullName}
								</h5>
								<p className="profile--hero__desc">
									@{userDetails.UserName}
								</p>
							</div>
							<button
								className="btn-edit"
								onClick={this.onHandleFollow}
							>
								{followed ? "FOLLOWING" : "FOLLOW"}
							</button>
						</div>
						<h6 className="status">{userDetails.status}</h6>
						<p className="followers">
							<span>{followers.length} Followers</span>
							<span>{following.length} Following</span>
						</p>
						<div className="profile--header">
							<div>
								<h5 className="profile--hero">POSTS</h5>
							</div>
						</div>
					</div>
					<div className="card-block">
						{!posts ? (
							<h1>No Post Found</h1>
						) : (
							posts.map((post) => (
								<div className="post--card" key={post.postID}>
									<div className="post--card__header">
										<img
											src={avatar}
											className="post--avatar"
											onError={this.onHandleError}
											alt=""
										/>
										<div>
											<h6 className="profile--hero">
												{userDetails.FullName}
											</h6>
											<p className="profile--hero__desc">
												@{userDetails.UserName}
											</p>
										</div>
									</div>
									<div className="post--card__body">
										<p>{post.post}</p>
										<p className="details">
											<span>{post.time}</span>
											<span>{post.date}</span>
										</p>
										<p className="requests">
											<span>
												<i className="fas fa-comments"></i>
											</span>
											<span
												onClick={() => {
													this.onHandleClick(post);
												}}
											>
												{post.likes ? (
													<i className="fas fa-heart error">
														{post.likes
															? post.likes.length
															: 0}
													</i>
												) : (
													<i className="fas fa-heart successful">
														{post.likes
															? post.likes.length
															: 0}
													</i>
												)}
											</span>
										</p>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default withFirebase(UsersProfiles);
