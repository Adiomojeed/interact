/** @format */

import React, { Component } from "react";
import Avatar from "../../assets/images/male.png";
import { withFirebase } from "../Firebase";
import { withEmailVerification, withAuthorization } from "../Session";
import MoonLoader from "react-spinners/MoonLoader";
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
			presentPost: null,
			avatar: Avatar,
			a: "",
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
			firebase.db.ref(`followers/${authUser.uid}`).on("value", (snapshot) => {
					const userObject = snapshot.val();
					let arr = [];
					userObject === null
						? (arr = [])
						: Object.keys(userObject).map((a) => arr.push(a));
					this.setState({ followers: arr });
				});
			firebase.db.ref(`following/${authUser.uid}`).on("value", (snapshot) => {
					const userObject = snapshot.val();
					let arr = [];
					userObject === null
						? (arr = [])
						: Object.keys(userObject).map((a) => arr.push(a));
					this.setState({ following: arr });
				});
			firebase.db.ref(`posts/${authUser.uid}`).on("value", (snapshot) => {
				const postObject = snapshot.val();
				let test;
				test =
					postObject === null
						? []
						: Object.keys(postObject).map((a) => ({
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
			firebase.storage
				.ref()
				.child(`images/${authUser.uid}`)
				.getDownloadURL()
				.then((url) => {
					window.localStorage.setItem("image", url);
					let a = window.localStorage.getItem("image");
					this.setState({ avatar: a });
				});
		});
	}

	componentWillUnmount() {
		
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
					.ref(
						`posts/${authUser.uid}/${e.postID}/likes/${authUser.uid}`
					)
					.remove();
				firebase.db
					.ref(`posts/${authUser.uid}/${e.postID}/likes`)
					.on("value", (snapshot) => {
						let a = snapshot.val();
						if (a === null) {
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
		const { user, followers, following, posts, avatar, liked } = this.state;
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
								comments=''
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
