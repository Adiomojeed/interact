/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Entropy } from "entropy-string";
import MoonLoader from "react-spinners/MoonLoader";
import PostCard from "./components/PostCard";
import CommentCard from "./components/CommentCard";

class CommentDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
			post: [],
			avatar: "",
			message: "",
			commenterObj: [],
			comments: [],
			commenter: [],
			usersImages: [],
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Profile";
		const { uid, pid, firebase } = this.props;

		firebase.auth.onAuthStateChanged((authUser) => {
			// correct
			firebase.db.ref(`users/${uid}`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				this.setState({ user: userObject });
			});
			firebase.db.ref(`posts/${uid}/${pid}`).on("value", (snapshot) => {
				let postObject = snapshot.val();
				let newPostObject = postObject === null ? [] : postObject;
				let commentObject =
					postObject === null ? [] : postObject.comments;
				const commenterArr =
					commentObject === undefined
						? []
						: Object.keys(commentObject);
				this.setState({
					post: newPostObject,
					commenterObj: commenterArr,
				});
				let commentsArr = [];
				for (let i in commenterArr) {
					let commenter = commenterArr[i];
					let individualComment = commentObject[commenter];
					firebase.db.ref("users").on("value", (snapshot) => {
						let usersObject = snapshot.val();
						usersObject = Object.keys(usersObject)
							.filter((user) =>
								commenterObj === undefined
									? []
									: commenterObj.includes(user)
							)
							.map((user) => usersObject[user]);
					});
					for (let j in individualComment) {
						let messageContent = individualComment[j];
						commentsArr.push({
							message: messageContent,
							uid: commenter,
						});
					}
				}
				this.setState({ comments: commentsArr });
				const { commenterObj } = this.state;
				firebase.db.ref("users").on("value", (snapshot) => {
					let newUser = new Object();
					let usersObject = snapshot.val();
					usersObject = Object.keys(usersObject)
						.filter((user) =>
							commenterObj === undefined
								? []
								: commenterObj.includes(user)
						)
						.map((user) => (newUser[user] = usersObject[user]));
					this.setState({ commenter: newUser });
				});
				let image = new Object();
				commenterObj.map((x) => {
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

			firebase.storage
				.ref()
				.child(`images/${uid}`)
				.getDownloadURL()
				.then((url) => {
					this.setState({ avatar: url });
				});
		});
	}

	onHandleChange(e) {
		this.setState({ message: e.target.value });
	}

	onHandleSubmit(e) {
		const { firebase, uid, pid } = this.props;
		const { message } = this.state;
		const entropy = new Entropy();
		const commentID = entropy.string();
		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db
				.ref(
					`posts/${uid}/${pid}/comments/${authUser.uid}/${commentID}`
				)
				.set(message);
			this.setState({ message: "" });
		});

		e.preventDefault();
	}

	render() {
		const {
			user,
			post,
			avatar,
			message,
			comments,
			commenter,
			usersImages,
		} = this.state;
		if (user.length === 0) {
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
				<p></p>
				<PostCard
					post={post}
					userDetails={user}
					avatar={avatar}
					onHandleError={this.onHandleError}
					onHandleClick={this.onHandleClick}
					key={post.postID}
					comments={comments}
				/>
				<h5>COMMENTS</h5>
				<div className="comment-block">
					{comments.map((comment, idx) => (
						<CommentCard
							usersImages={usersImages}
							comment={comment}
							commenter={commenter}
							key={idx}
						/>
					))}
				</div>
				<div className="message">
					<form onSubmit={this.onHandleSubmit}>
						<div className="form-group">
							<textarea
								name="status"
								placeholder="Your comment here..."
								onChange={this.onHandleChange}
								value={message}
								rows="3"
							></textarea>
						</div>
						<button
							className="btn btn-edit"
							disabled={message.length === 0}
						>
							COMMENT
						</button>
					</form>
				</div>
			</>
		);
	}
}

export default withFirebase(CommentDetails);
