/** @format */

import React, { Component } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import Avatar from "../../assets/images/male.png";
import { withFirebase } from "../Firebase";
import { withEmailVerification, withAuthorization } from "../Session";
import PostCard from "./components/PostCard";

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
			followers: "",
			following: "",
			posts: null,
			liked: false,
			avatar: Avatar,
		};

		this.onHandleClick = this.onHandleClick.bind(this);
		this.onHandleError = this.onHandleError.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Profile";
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db.ref(`users/${authUser.uid}`).on("value", (snapshot) => {
				let userObject = snapshot.val();
				userObject = { ...userObject, uid: authUser.uid };
				this.setState({ user: userObject });
			});
			firebase.db
				.ref(`followers/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					let followArr = [];
					userObject === null
						? (followArr = [])
						: Object.keys(userObject).map((user) =>
								followArr.push(user)
						  );
					this.setState({ followers: followArr });
				});
			firebase.db
				.ref(`following/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					let followArr = [];
					userObject === null
						? (followArr = [])
						: Object.keys(userObject).map((user) =>
								followArr.push(user)
						  );
					this.setState({ following: followArr });
				});
			firebase.db.ref(`posts/${authUser.uid}`).on("value", (snapshot) => {
				const postObject = snapshot.val();
				let newPostObject =
					postObject === null
						? []
						: Object.keys(postObject).map((postID) => ({
								...postObject[postID],
								postID,
						  }));
				const postComments = Object.keys(newPostObject).map(
					(postID) => newPostObject[postID].comments
				);
				for (let i = 0; i < postComments.length; i++) {
					let IndividualMessageArr = [];
					const individualMessageObj = Object.keys(postComments[i]).map(
						(j) => postComments[i][j]
					);
					for (let j = 0; j < individualMessageObj.length; j++) {
						const messageArr = Object.keys(individualMessageObj[j]);
						IndividualMessageArr.push(messageArr);
					}
					IndividualMessageArr = IndividualMessageArr.reduce(
						(a, b) => a.concat(b),
						[]
					);
					newPostObject[i].comments = IndividualMessageArr;
				}
				newPostObject = newPostObject.sort((a, b) => b.ms - a.ms);
				this.setState({ posts: newPostObject });
			});
			firebase.storage
				.ref()
				.child(`images/${authUser.uid}`)
				.getDownloadURL()
				.then((url) => {
					window.localStorage.setItem("image", url);
					const image = window.localStorage.getItem("image");
					this.setState({ avatar: image });
				});
		});
	}

	onHandleError() {
		this.setState({ avatar: Avatar });
	}

	onHandleClick(e) {
		const { firebase } = this.props;
		const { liked } = this.state;
		firebase.auth.onAuthStateChanged((authUser) => {
			if (liked) {
				firebase.db
					.ref(
						`posts/${authUser.uid}/${e.postID}/likes/${authUser.uid}`
					)
					.remove();
				firebase.db
					.ref(`posts/${authUser.uid}/${e.postID}/likes`)
					.on("value", (snapshot) => {
						const likes = snapshot.val();
						if (likes === null) {
							firebase.db
								.ref(`posts/${authUser.uid}/${e.postID}/likes`)
								.set("");
						}
					});
			} else {
				firebase.db
					.ref(
						`posts/${authUser.uid}/${e.postID}/likes/${authUser.uid}`
					)
					.set("liked");
			}
		});
		this.setState({ liked: !this.state.liked });
	}

	render() {
		const { user, followers, following, posts, avatar } = this.state;
		if (user.length === 0) {
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
							<h5 className="profile--hero">{user.FullName}</h5>
							<p className="profile--hero__desc">
								@{user.UserName}
							</p>
						</div>
						<a href="/dashboard/edit">
							<button className="btn-edit">EDIT PROFILE</button>
						</a>
					</div>
					<h6 className="status">{user.status}</h6>
					<p className="followers">
						<a href="/dashboard/followers">
							<span>{followers.length} Followers</span>
						</a>
						<a href="/dashboard/following">
							<span>{following.length} Following</span>
						</a>
					</p>
					<div className="profile--header">
						<div>
							<h5 className="profile--hero">POSTS</h5>
						</div>
						<a href="/dashboard/create">
							<button className="btn-edit">CREATE A POST</button>
						</a>
					</div>
				</div>
				<div className="card-block">
					{!posts ? (
						<h1>No Post Found</h1>
					) : (
						posts.map((post) => (
							<PostCard
								post={post}
								userDetails={user}
								avatar={avatar}
								onHandleError={this.onHandleError}
								onHandleClick={this.onHandleClick}
								key={post.postID}
								comments={post.comments.length}
							/>
						))
					)}
				</div>
			</>
		);
	}
}

const condition = (authUser) => authUser != null;

export default withEmailVerification(
	withAuthorization(condition)(withFirebase(Profile))
);
