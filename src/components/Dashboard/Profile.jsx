/** @format */

import React, { Component } from "react";
import Avatar from "../../assets/images/male.png";
import { withFirebase } from "../Firebase";
import { NavLink } from "react-router-dom";

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
	}

	componentDidMount() {
		const { avatar } = this.state;
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`users/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ user: userObject });
				});
			this.props.firebase.db
				.ref(`followers/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ followers: userObject });
				});
			this.props.firebase.db
				.ref(`following/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ following: userObject });
				});
			this.props.firebase.db
				.ref(`posts/${authUser.uid}`)
				.on("value", (snapshot) => {
					const postObject = snapshot.val();
					const test = Object.keys(postObject).map((a) => ({
						...postObject[a],
						postID: a,
					}));
					this.setState({ posts: test });
				});
			this.props.firebase.storage
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

	onHandleClick(e) {
		if (this.state.liked === false) {
			e.likes = e.likes + 1;
			this.setState({ liked: true });
		} else {
			e.likes = e.likes - 1;
			this.setState({ liked: false });
		}
		this.setState({ presentPost: { ...e, likes: e.likes } });
		this.setState({ posts: this.state.posts });
		let a = e.likes;
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`posts/${authUser.uid}/${e.postID}`)
				.update({ likes: a });
		});
	}

	render() {
		const { user, followers, following, posts, avatar } = this.state;
		if (user.length === 0) {
			return <h1>Loading...</h1>;
		}
		return (
			<div className="row">
				<div className="col px">
					<div className="card"></div>
					<div className="profile--card">
						<a href={avatar}><img src={avatar} className="profile--avatar" alt="" /></a>
						<div className="profile--header">
							<div>
								<h5 className="profile--hero">
									{user.FullName}
								</h5>
								<p className="profile--hero__desc">
									@{user.UserName}
								</p>
							</div>
							<NavLink to="/dashboard/edit">
								<button className="btn-edit">
									EDIT PROFILE
								</button>
							</NavLink>
						</div>
						<h6 className="status">{user.status}</h6>
						<p className="followers">
							<span>{followers.followers} Followers</span>
							<span>{following.following} Following</span>
						</p>
						<div className="profile--header">
							<div>
								<h5 className="profile--hero">POSTS</h5>
							</div>
							<NavLink to="/dashboard/create">
								<button className="btn-edit">
									CREATE A POST
								</button>
							</NavLink>
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
											alt=""
										/>
										<div>
											<h6 className="profile--hero">
												{user.FullName}
											</h6>
											<p className="profile--hero__desc">
												@{user.UserName}
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
														{post.likes}
													</i>
												) : (
													<i className="fas fa-heart successful">
														{post.likes}
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

export default withFirebase(Profile);
