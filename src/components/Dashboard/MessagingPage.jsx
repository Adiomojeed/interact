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
			messengersObj: [],
			messagesList: [],
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

		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db
				.ref(`messages/${authUser.uid}/${mid}`)
				.on("value", (snapshot) => {
					const messagesObject =
						snapshot.val() === null ? [] : snapshot.val();
					const messengersID = Object.keys(messagesObject);
					let messagesList = [];
					for (let i in messengersID) {
						let messenger = messengersID[i];
						let individualMessage = messagesObject[messenger];
						firebase.db.ref("users").on("value", (snapshot) => {
							let newMessenger = new Object();
							let usersObject = snapshot.val();
							usersObject = Object.keys(usersObject)
								.filter((userID) =>
									messengersID === undefined
										? []
										: messengersID.includes(userID)
								)
								.map(
									(userID) =>
										(newMessenger[userID] =
											usersObject[userID])
								);
							this.setState({ messengersObj: newMessenger });
						});
						for (let j in individualMessage) {
							let messageContent = individualMessage[j];
							messagesList.push({
								message: messageContent.message,
								time: messageContent.time,
								date: messageContent.date,
								ms: messageContent.ms,
								uid: messenger,
							});
						}
					}
					messagesList = messagesList.sort((a, b) => a.ms - b.ms);
					this.setState({ messagesList });
				});
		});
	}

	onHandleChange(e) {
		this.setState({ message: e.target.value });
	}

	onHandleSubmit() {
		const { firebase, mid } = this.props;
		const { message } = this.state;
		let totalDate = new Date();
		let date = totalDate.toLocaleDateString();
		let time = totalDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		const ms = totalDate.getTime();
		const entropy = new Entropy();
		const messageID = entropy.string();

		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db
				.ref(
					`messages/${authUser.uid}/${mid}/${authUser.uid}/${messageID}`
				)
				.set({ message, date, time, ms });
			firebase.db
				.ref(
					`messages/${mid}/${authUser.uid}/${authUser.uid}/${messageID}`
				)
				.set({ message, date, time, ms });
			this.setState({ message: "" });
		});
		//e.preventDefault();
	}

	render() {
		const {
			user,
			avatar,
			message,
			messengersObj,
			messagesList,
		} = this.state;
		const { mid } = this.props;
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
				<a href={`/dashboard/users/${mid}`} id="1">
					<div className="respondent__head">
						<img src={avatar} alt="" />
						<div className="respondent__profile">
							<h5>{user.FullName}</h5>
							<small>@{user.UserName}</small>
						</div>
					</div>
				</a>
				<div className="comment-block mt-3">
					{messagesList.map((message, idx) => (
						<div className="comment-card" key={idx}>
							<div className="comment-content box-shadow">
								{messengersObj[message.uid] === undefined ? (
									""
								) : (
									<h6>
										{messengersObj[message.uid].FullName}{" "}
										<small>
											{message.date} - {message.time}
										</small>
									</h6>
								)}

								<p>{message.message}</p>
							</div>
						</div>
					))}
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
								className="reply"
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
