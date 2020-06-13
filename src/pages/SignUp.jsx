/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/** @format */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withAlert } from "react-alert";
import Container from "../components/Container";
import { withFirebase } from "../components/Firebase/index";

const INITIAL_STATE = {
	email: "",
	password: "",
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

	componentDidMount() {
		document.title = "Intteract - Sign Up";
		const file = new File(["male"], "../assets/images/male.png", {
			type: "image/png",
		});
		this.setState({ image: file });
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
		const { email, password } = this.state;
		const { firebase, history } = this.props;
		firebase
			.doCreateUserWithEmailAndPassword(email, password)
			.then(() => {
				firebase.auth.currentUser
					.sendEmailVerification()
					.catch((error) => {error});
			})
			.then(() => history.push("/create"))
			.catch((error) => this.setState({ error }));
		e.preventDefault();
	}

	render() {
		const { email, password, error, eyeStatus } = this.state;
		const isInvalid = email === "" || password === "";

		return (
			<Container>
				<form onSubmit={this.onHandleSubmit}>
					<div className="form-group">
						<h2>Create an account</h2>
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
					<div className="form-group d-flex justify-content-between">
						<a href="/">
							<small>Sign In</small>
						</a>
					</div>
				</form>
			</Container>
		);
	}
}

const SignUp = withRouter(withFirebase(withAlert()(SignUpForm)));

export default SignUp;
