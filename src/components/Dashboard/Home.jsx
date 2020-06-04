/** @format */

import React, { Component } from "react";
import Avatar from "../../assets/images/male.png";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
			posts: null,
			liked: false,
			presentPost: null,
			avatar: Avatar,
			a: "",
		};

		this.onHandleClick = this.onHandleClick.bind(this);
	}

	componentDidMount() {
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db.ref(`users`).on("value", (snapshot) => {
                const userObject = snapshot.val();
				this.setState({ user: userObject });
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
			return <h1>Loading...</h1>;
		}
		return (
			<div className="row">
				<div className="col px">
					<div className="card-block pt">
						<div className="post--card">
							<div className="post--card__header">
								<img
									src={avatar}
									className="post--avatar"
									alt=""
								/>
								<div>
									<h6 className="profile--hero">Adio</h6>
									<p className="profile--hero__desc">
										codeLeaf
									</p>
								</div>
							</div>
							<div className="post--card__body">
								<p>gfusdv svhjds jsd vjsd </p>
								<p className="details">
									<span>11:12</span>
									<span>26/2</span>
								</p>
								<p className="requests">
									<span>
										<i className="fas fa-comments"></i>
									</span>
									<span>
										<i className="fas fa-heart error">1</i>
									</span>
								</p>
							</div>
						</div>
                        <div className="post--card">
							<div className="post--card__header">
								<img
									src={avatar}
									className="post--avatar"
									alt=""
								/>
								<div>
									<h6 className="profile--hero">Adio</h6>
									<p className="profile--hero__desc">
										codeLeaf
									</p>
								</div>
							</div>
							<div className="post--card__body">
								<p>gfusdv svhjds jsd vjsd </p>
								<p className="details">
									<span>11:12</span>
									<span>26/2</span>
								</p>
								<p className="requests">
									<span>
										<i className="fas fa-comments"></i>
									</span>
									<span>
										<i className="fas fa-heart error">1</i>
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withFirebase(Home);
