/** @format */

import React, { Component } from "react";
import Container from "../components/Container";
import Avatar from "../assets/images/male.png";
import { withFirebase } from "../components/Firebase/index";
import { Link, withRouter } from "react-router-dom";
import { withAlert } from "react-alert";
import imageCompression from "browser-image-compression";

const INITIAL_STATE = {
	FullName: "",
	UserName: "",
	email: "",
	password: "",
	status: "No Status",
	post: "No Post Found",
	eyeStatus: "fas fa-eye",
	image: "",
	error: null,
};

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.onHandleToggle = this.onHandleToggle.bind(this);
	}

	componentWillMount() {
		document.title = "Intteract - Sign Up";
	}

	componentDidMount() {
		var file = new File(["male"], "../assets/images/male.png", {
			type: "image/png",
		});
		this.setState({ image: file });
		console.log(file)
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleToggle(e) {
		if (e.target.previousElementSibling.type === "password") {
			e.target.previousElementSibling.type = "text";
			this.setState({ eyeStatus: "fas fa-eye-slash" });
		} else {
			e.target.previousElementSibling.type = "password";
			this.setState({ eyeStatus: "fas fa-eye" });
		}
	}

	onHandleSubmit(e) {
		const {
			FullName,
			UserName,
			status,
			email,
			password,
			image,
		} = this.state;
		const { firebase } = this.props;
		firebase.auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				firebase.db
					.ref(`users/${authUser.user.uid}`)
					.set({ FullName, UserName, email, status });
			})
			.then(() => {
				firebase.auth.onAuthStateChanged((authUser) => {
					firebase.storage
						.ref(`images/${authUser.uid}`)
						.put(image)
				});
			})
			.then(() => {
				firebase.auth.currentUser
					.sendEmailVerification()
					.catch((error) => console.error(error));
			})
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push("/dashboard");
			})
			.catch((error) => this.setState({ error }));

		e.preventDefault();
	}

	render() {
		const {
			FullName,
			email,
			UserName,
			password,
			error,
			eyeStatus,
		} = this.state;
		const isInvalid = FullName === "" || email === "" || password === "";

		return (
			<Container>
				<form onSubmit={this.onHandleSubmit}>
					<div className="form-group">
						<h2>Create an account</h2>
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
						<input
							type="email"
							name="email"
							value={email}
							onChange={this.onHandleChange}
							placeholder="Email Address"
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							name="password"
							value={password}
							onChange={this.onHandleChange}
							placeholder="Password"
						/>
						<i
							className={eyeStatus}
							onClick={this.onHandleToggle}
						></i>
					</div>
					<div className="form-group">
						{error && <p>{error.message}</p>}
					</div>
					<div className="form-group">
						<button
							className="btn btn-primary"
							type="submit"
							disabled={isInvalid}
						>
							REGISTER
						</button>
					</div>
					<div className="form-group">
						<Link to="/">
							<small>Sign In</small>
						</Link>
					</div>
				</form>
			</Container>
		);
	}
}

const SignUp = withRouter(withFirebase(withAlert()(SignUpForm)));

export default SignUp;
