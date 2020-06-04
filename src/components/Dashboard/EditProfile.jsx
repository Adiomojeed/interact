/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { navigate } from "@reach/router";
import Avatar from "../../assets/images/male.png";
import imageCompression from "browser-image-compression";

class EditProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			FullName: "",
			UserName: "",
			status: "",
			image: "",
			avatar: Avatar,
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleError = this.onHandleError.bind(this)
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.onHandleUpload = this.onHandleUpload.bind(this);
		this.onHandleImageSelect = this.onHandleImageSelect.bind(this);
	}
	
	componentDidMount() {
		document.title = "Intteract - Edit Profile";
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db.ref(`users/${authUser.uid}`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				this.setState({
					FullName: userObject.FullName,
					UserName: userObject.UserName,
					status: userObject.status,
				});
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

	onHandleError() {
		this.setState({ avatar: Avatar });
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { firebase } = this.props;
		const { FullName, UserName, status } = this.state;
		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db
				.ref(`users/${authUser.uid}`)
				.update({ FullName, UserName, status });
		});
		navigate("/dashboard");
		e.preventDefault();
	}

	onHandleImageSelect(event) {
		this.setState({ image: event.target.files[0] });
	}

	onHandleUpload() {
		const { firebase } = this.props;
		const { image } = this.state;
		var imageFile = image;

		var options = {
			maxSizeMB: 2,
			maxWidthOrHeight: 500,
			useWebWorker: true,
		};
		imageCompression(imageFile, options)
			.then((compressedFile) => {
				firebase.auth.onAuthStateChanged((authUser) => {
					firebase.storage
						.ref(`images/${authUser.uid}`)
						.put(compressedFile)
						.on("state_changed", function (snapshot) {
							var progress =
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
								100;
							if (progress === 100) {
								window.location.reload();
							}
						});
				});
			})

			.catch(function (error) {});
	}

	render() {
		const { FullName, UserName, status, avatar } = this.state;
		return (
			<>
				<div className="px-2 px-lg-5">
					<form onSubmit={this.onHandleSubmit}>
						<div className="form-group">
							<h4>EDIT PROFILE</h4>
						</div>
						<div className="form-group">
							<input
								type="file"
								name="avatar"
								id="avatar"
								className="file"
								onChange={this.onHandleImageSelect}
							/>
							<div className="upload--block">
								<div className="upload">
									<label htmlFor="avatar">
										<span>+</span>
										<img
											src={avatar}
											onError={this.onHandleError}
											className="upload--avatar"
										/>
									</label>
								</div>
								<button
									className="btn btn-primary btn-upload"
									onClick={this.onHandleUpload}
									type="submit"
								>
									Upload Profile Picture
								</button>{" "}
								<br />
							</div>
						</div>
						<div className="form-group">
							<input
								type="text"
								name="FullName"
								value={FullName}
								onChange={this.onHandleChange}
								placeholder="Full Name"
								className="edit-control"
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								name="UserName"
								value={UserName}
								onChange={this.onHandleChange}
								placeholder="User Name"
								className="edit-control"
							/>
						</div>
						<div className="form-group">
							<textarea
								name="status"
								value={status}
								onChange={this.onHandleChange}
								placeholder="Your status here..."
								rows="10"
							></textarea>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary btn-update"
								type="submit"
							>
								UPDATE PROFILE
							</button>
						</div>
					</form>
				</div>
			</>
		);
	}
}

export default withFirebase(EditProfile);
