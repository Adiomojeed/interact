/** @format */

import React, { Component } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { Entropy } from "entropy-string";
import { withFirebase } from "../Firebase";

class MessagingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
			avatar: "",
			message: "",
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	componentDidMount() {
		const { firebase, mid } = this.props;
		firebase.db.ref(`users/${mid}`).on("value", (snapshot) => {
			const userObject = snapshot.val();
			this.setState({ user: userObject });
		});
		firebase.storage
			.ref()
			.child(`images/${mid}`)
			.getDownloadURL()
			.then((url) => {
				this.setState({ avatar: url });
			});
	}

	onHandleChange(e) {
		this.setState({ message: e.target.value });
	}

	onHandleSubmit(e) {
		const { firebase, mid } = this.props;
		const { message } = this.state;
		const entropy = new Entropy();
		const messageID = entropy.string();
		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db
				.ref(
					`messages/${authUser.uid}/${mid}/${authUser.uid}/${messageID}`
				)
                .set(message);
            firebase.db.ref(`messages/${mid}/${authUser.uid}/${authUser.uid}/${messageID}`).set(message)
			this.setState({ message: "" });
		});
		//e.preventDefault();
	}

	render() {
		const { user, avatar, message } = this.state;
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
			<div className="px-lg-5">
				<div className="respondent__head">
					<img src={avatar} alt="" />
					<div className="respondent__profile">
						<h5>{user.FullName}</h5>
						<small>@{user.UserName}</small>
					</div>
				</div>
				<div className="comment-block mt-3">
					<div className="comment-card">
						<div className="comment-content box-shadow">
							<h6>
								Adio Mojeed
								<small>-@ codeLeaf</small>
							</h6>
							<p>comment 1</p>
						</div>
					</div>
					<div className="comment-card">
						<div className="comment-content box-shadow">
							<h6>
								Adio Mojeed
								<small>-@ codeLeaf</small>
							</h6>
							<p>comment 1</p>
						</div>
					</div>
					<div className="comment-card">
						<div className="comment-content box-shadow">
							<h6>
								Adio Mojeed
								<small>-@ codeLeaf</small>
							</h6>
							<p>comment 1</p>
						</div>
					</div>
				</div>
				<div className="message">
					<div>
						<div className="form-group">
							<textarea
								name="status"
								placeholder={`message ${user.FullName}`}
								onChange={this.onHandleChange}
								value={message}
                                rows="2"
                                className='reply'
							></textarea>
							<i
								className="fas fa-paper-plane message-icon"
								onClick={this.onHandleSubmit}
							></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withFirebase(MessagingPage);
