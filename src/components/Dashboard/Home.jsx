/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/** @format */

import React, { Component } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { withFirebase } from "../Firebase";
import PostCard from "./components/PostCard";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			posts: null,
			liked: false,
			usersImages: [],
		};

		this.onHandleClick = this.onHandleClick.bind(this);
	}

	componentDidMount() {
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			// correct
			let usersID;
			firebase.db.ref('posts').on('value', snapshot => {
				usersID = snapshot.val() === null ? [] : Object.keys(snapshot.val()) 
				firebase.db.ref(`users`).on("value", (snapshot) => {
					const newUsersObject = {};
					let usersObject = snapshot.val();
					usersObject = usersID.map(
						(userID) =>
							(newUsersObject[userID] = {
								...usersObject[userID],
								uid: userID,
							})
					);
					this.setState({ users: newUsersObject });
					let totalPosts = [];
					for (let id = 0; id < usersID.length; id++) {
						firebase.db
							.ref(`posts/${usersID[id]}`)
							.on("value", (snapshot) => {
								const postObject = snapshot.val();
								const newPostObject =
									postObject === null
										? []
										: Object.keys(postObject).map((postID) => ({
												...postObject[postID],
												postID,
												uid: usersID[id],
										  }));
								const postsLikes = Object.keys(newPostObject).map(
									(postID) => newPostObject[postID].likes
								);
								
								const postsComments = Object.keys(newPostObject).map(
									(postID) => newPostObject[postID].comments
								);
								for (let i = 0; i < postsComments.length; i++) {
									let IndividualMessageArr = [];
									const individualMessageObj = Object.keys(
										postsComments[i]
									).map((j) => postsComments[i][j]);
									for (
										let j = 0;
										j < individualMessageObj.length;
										j++
									) {
										const messageArr = Object.keys(
											individualMessageObj[j]
										);
										IndividualMessageArr.push(messageArr);
									}
									IndividualMessageArr = IndividualMessageArr.reduce(
										(a, b) => a.concat(b),
										[]
									);
									newPostObject[i].comments =
										IndividualMessageArr.length;
								}
								let i = 0;
								for (i; i < postsLikes.length; i++) {
									const postLikes = (postsLikes[i]) === undefined ? [] : Object.keys(postsLikes[i]);
									newPostObject[i].likes = postLikes;
									if (postLikes.includes(authUser.uid)) {
										this.setState({ liked: true });
									}
								}
								totalPosts.push(newPostObject);
								totalPosts = totalPosts.reduce(
									(a, b) => a.concat(b),
									[]
								);
								totalPosts = totalPosts.sort((a, b) => b.ms - a.ms);
								this.setState({ posts: totalPosts });
							});
					}
					const image = {};
					usersID.map((uid) => {
						firebase.storage
							.ref()
							.child(`images/${uid}`)
							.getDownloadURL()
							.then((url) => {
								image[uid] = url;
								this.setState({ usersImages: image });
							});
					});
				});
			})
			
		});
	}

	onHandleClick(e) {
		const { firebase } = this.props;
		const { liked } = this.state;
		firebase.auth.onAuthStateChanged((authUser) => {
			if (liked) {
				firebase.db
					.ref(`posts/${e.uid}/${e.postID}/likes/${authUser.uid}`)
					.remove();
				firebase.db
					.ref(`posts/${e.uid}/${e.postID}/likes`)
					.on("value", (snapshot) => {
						const a = snapshot.val();
						if (a === null) {
							firebase.db
								.ref(`posts/${e.uid}/${e.postID}/likes`)
								.set("");
						}
					});
			} else {
				firebase.db
					.ref(`posts/${e.uid}/${e.postID}/likes/${authUser.uid}`)
					.set("liked");
			}
		});
		this.setState({ liked: !this.state.liked });
	}

	render() {
		const { users, posts, usersImages } = this.state;
		if (!posts) {
			return <div>
			<MoonLoader
				css="margin: 0 auto; margin-top: 20px"
				size={50}
				color={"#123abc"}
				loading={this.state.loading}
			/>
		</div>
		}
		return (
			<>
				<div>
					<h5 className="follow-head">TIMELINE</h5>
				</div>
				<div className="card-block pt">
					{posts.map((post, idx) => (
						<PostCard
							post={post}
							userDetails={users[post.uid]}
							avatar={usersImages[post.uid]}
							onHandleError={this.onHandleError}
							onHandleClick={this.onHandleClick}
							key={idx}
							comments={post.comments}
						/>
					))}
				</div>
			</>
		);
	}
}

export default withFirebase(Home);
