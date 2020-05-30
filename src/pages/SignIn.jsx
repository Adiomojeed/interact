/** @format */

import React, { Component } from "react";
import Container from "../components/Container";
import { navigate } from "@reach/router";
import { withFirebase } from "../components/Firebase/index";
import { withAlert } from "react-alert";

const INITIAL_STATE = {
	email: "",
	password: "",
	eyeStatus: "fas fa-eye",
	users: [],
	error: null,
};

class SignInForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.onHandleToggle = this.onHandleToggle.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Sign In";
		this.ref = this.props.firebase.user("users").on("value", (snapshot) => {
			const usersObject = snapshot.val();
			let users;
			if (usersObject === null) {
				users = [];
			} else {
				users = Object.keys(usersObject).map(
					(user) => usersObject[user].email
				);
			}
			this.setState({ users });
		});
	}

	componentWillUnmount() {
		this.ref().off();
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
		const { email, password, users } = this.state;
		const { firebase } = this.props;
		firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				if (users.includes(email)) {
					navigate("/dashboard");
					location.reload();
				} else {
					navigate("/create");
					location.reload();
				}
			})
			.catch((error) => this.setState({ error }));
		e.preventDefault();
		//const { email, password } = this.state;
		//this.props.firebase.auth
		//	.signInWithEmailAndPassword(email, password)
		//	.then(() => {
		//		this.setState({ ...INITIAL_STATE });
		//		navigate("/dashboard");
		//	})
		//	.then(() => {
		//		// eslint-disable-next-line no-restricted-globals
		//		location.reload();
		//	})
		//	.then(() => {
		//		this.setState({ ...INITIAL_STATE });
		//		this.props.alert.show("Successfully Signed In!");
		//	})
		//	.catch((error) => this.setState({ error }));
		//e.preventDefault();
	}

	render() {
		const { email, password, eyeStatus, error } = this.state;
		const isInvalid = email === "" || password === "";
		return (
			<Container>
				<form onSubmit={this.onHandleSubmit}>
					<div className="form-group">
						<h2>Login</h2>
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
							SIGN IN
						</button>
					</div>
					<div className="form-group d-flex justify-content-between">
						<a href="/register">
							<small>Register</small>
						</a>
						<a href="/forget-pw">
							<small>Forget Password?</small>
						</a>
					</div>
				</form>
			</Container>
		);
	}
}

const SignIn = withFirebase(withAlert()(SignInForm));

export default SignIn;
