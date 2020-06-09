/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import Avatar from "../../assets/images/male.png";
import MoonLoader from "react-spinners/MoonLoader";
import PostCard from "./components/PostCard";

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
		this.onHandleError = this.onHandleError.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Profile";
		const { id, firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			// correct
			firebase.db.ref(`users/${id}`).on("value", (snapshot) => {
				let userObject = snapshot.val();
				userObject = { ...userObject, uid: id };
				this.setState({ userDetails: userObject });
			});
			// correct
			firebase.db.ref(`followers/${id}`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				let followID =
					userObject === null ? [] : Object.keys(userObject);
				this.setState({ followers: followID });
				if (followID.includes(authUser.uid)) {
					this.setState({ followed: true });
				}
			});
			// correct
			firebase.db.ref(`following/${id}`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				let followID =
					userObject === null ? [] : Object.keys(userObject);
				this.setState({ following: followID });
			});
			firebase.db.ref(`posts/${id}`).on("value", (snapshot) => {
				const postObject = snapshot.val();
				let newPostObject =
					postObject === null
						? []
						: Object.keys(postObject).map((postID) => ({
								...postObject[postID],
								postID,
						  }));
				let postsLikes = Object.keys(newPostObject).map(
					(postID) => newPostObject[postID].likes
				);
				let postsComments = Object.keys(newPostObject).map(
					(postID) => newPostObject[postID].comments
				);
				for (let i = 0; i < postsComments.length; i++) {
					let IndividualMessageArr = [];
					let individualMessageObj = Object.keys(
						postsComments[i]
					).map((j) => postsComments[i][j]);
					for (let j = 0; j < individualMessageObj.length; j++) {
						let messageArr = Object.keys(individualMessageObj[j]);
						IndividualMessageArr.push(messageArr);
					}
					IndividualMessageArr = IndividualMessageArr.reduce(
						(a, b) => a.concat(b),
						[]
					);
					newPostObject[i].comments = IndividualMessageArr.length;
				}
				let i = 0;
				for (i; i < postsLikes.length; i++) {
					let postLikes = Object.keys(postsLikes[i]);
					newPostObject[i].likes = postLikes;
					if (postLikes.includes(authUser.uid)) {
						this.setState({ liked: true });
					}
				}
				newPostObject = newPostObject.sort((a, b) => b.ms - a.ms);
				this.setState({ posts: newPostObject });
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
			// correct

	onHandleFollow() {
		const { id, firebase } = this.props;
		const { followed } = this.state;

		firebase.auth.onAuthStateChanged((authUser) => {
			if (followed) {
				firebase.db.ref(`following/${authUser.uid}/${id}`).remove();
				firebase.db.ref(`followers/${id}/${authUser.uid}`).remove();
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
		if (userDetails.length === 0) {
			return (
				<div>
					<MoonLoader
						css="margin: 0 auto; margin-top: 20px"
						size={40}
						color={"#123abc"}
						loading={this.state.loading}
					/>
				</div>
			);
		}
		return (
			<>
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
						<div className="message-redirect">
							<a href={`/dashboard/messages/${userDetails.uid}`}>
								<i
									className={`fas fa-envelope ${
										followed ? "d-block" : "d-none"
									}`}
								></i>
							</a>
							<button
								className="btn-edit"
								onClick={this.onHandleFollow}
							>
								{followed ? "FOLLOWING" : "FOLLOW"}
							</button>
						</div>
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
							<PostCard
								post={post}
								userDetails={userDetails}
								avatar={avatar}
								onHandleError={this.onHandleError}
								onHandleClick={this.onHandleClick}
								key={post.postID}
								comments={post.comments}
							/>
						))
					)}
				</div>
			</>
		);
	}
}

export default withFirebase(UsersProfiles);
