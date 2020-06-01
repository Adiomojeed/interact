/** @format */

import React, { Component } from "react";
import { navigate } from "@reach/router";
import Avatar from "../assets/images/male.png";
import {
	withAuthorization,
	withEmailVerification,
} from "../components/Session/index";
import { withFirebase } from "../components/Firebase/index";
import Container from "../components/Container";
import imageCompression from "browser-image-compression";

class HomeBaseForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			FullName: "",
			UserName: "",
			status: "No Status",
			avatar: Avatar,
			image: "",
			error: null,
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.onHandleImageSelect = this.onHandleImageSelect.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Create Profile";
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleImageSelect(event) {
		this.setState({ image: event.target.files[0] });
	}

	onHandleSubmit(e) {
		const { FullName, UserName, image, status } = this.state;
		const { firebase } = this.props;
		let imageFile = image;
		let options = {
			maxSizeMB: 2,
			maxWidthOrHeight: 500,
			useWebWorker: true,
		};

		firebase.auth.onAuthStateChanged((authUser) => {
			firebase
				.user(`users/${authUser.uid}`)
				.set({ FullName, UserName, status, email: authUser.email })
				.then(() => {
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
				})
				.then(() => navigate("/dashboard"))
				.catch((error) => this.setState({ error }));
		});
		e.preventDefault();
	}

	render() {
		const { FullName, UserName, error, avatar, image } = this.state;
		const isInvalid =
			FullName === "" || UserName === "" || image.length === 0;
		return (
			<Container>
				<form onSubmit={this.onHandleSubmit}>
					<div className="form-group">
						<h5>You are one step away, create your profile</h5>
						<small className='text-red'>* Make sure you select all fields</small>
					</div>
					<div className="form-group">
						<input
							type="file"
							name="avatar"
							id="avatar"
							className="file"
							onChange={this.onHandleImageSelect}
						/>
						<label htmlFor="avatar">
							<span>+</span>
							<img
								src={avatar}
								onError={this.onHandleError}
								className="upload--avatar"
							/>
						</label>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="FullName"
							value={FullName}
							onChange={this.onHandleChange}
							placeholder="Full Name"
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="UserName"
							value={UserName}
							onChange={this.onHandleChange}
							placeholder="User Name"
						/>
					</div>
					<div className="form-group">
						{error && <p>{error.message}</p>}
					</div>
					<div className="form-group mt">
						<button
							className="btn btn-primary"
							type="submit"
							disabled={isInvalid}
						>
							PROCEED TO APP
						</button>
					</div>
				</form>
			</Container>
		);
	}
}

const HomeBase = withFirebase(HomeBaseForm);

const condition = (authUser) => authUser != null;

export default withEmailVerification(withAuthorization(condition)(HomeBase));
