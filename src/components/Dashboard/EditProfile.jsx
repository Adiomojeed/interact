/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { navigate } from '@reach/router'
import { withRouter } from "react-router-dom";
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
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.onHandleUpload = this.onHandleUpload.bind(this);
		this.onHandleImageSelect = this.onHandleImageSelect.bind(this);
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`users/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({
						FullName: userObject.FullName,
						UserName: userObject.UserName,
						status: userObject.status,
					});
				});
		});
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { FullName, UserName, status } = this.state;
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`users/${authUser.uid}`)
				.update({ FullName, UserName, status });
		});
		navigate("/dashboard/profile");
		e.preventDefault();
	}

	onHandleImageSelect(event) {
		this.setState({ image: event.target.files[0] });
	}

	onHandleUpload() {
		const { image } = this.state;
		var imageFile = image;

		var options = {
			maxSizeMB: 2,
			maxWidthOrHeight: 500,
			useWebWorker: true,
		};
		imageCompression(imageFile, options)
			.then((compressedFile) => {
				this.props.firebase.auth.onAuthStateChanged((authUser) => {
					this.props.firebase.storage
						.ref(`images/${authUser.uid}`)
						.put(compressedFile)
						.on("state_changed", function (snapshot) {
							var progress =
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
								100;
							console.log("Upload is " + progress + "% done");
							if (progress === 100) {
								window.location.reload()
							}
						});
				});
			})

			.catch(function (error) {
				console.log(error.message);
			});
	}

	render() {
		const { FullName, UserName, status } = this.state;
		return (
			<div className="row">
				<div className="col col-lg-10 offset-lg px-2 px-xl-3">
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
								//value={image}
								onChange={this.onHandleImageSelect}
							/>
							<div className="upload--block">
								<div className="upload">
									<label htmlFor="avatar">
										<img
											src={Avatar}
											className="upload--avatar"
										/>
									</label>
								</div>
								<button
									className="btn btn-primary btn-upload"
									onClick={this.onHandleUpload}
									type='submit'
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
			</div>
		);
	}
}

export default withFirebase(EditProfile);
