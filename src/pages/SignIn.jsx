/** @format */

import React, { Component } from "react";
import Container from "../components/Container";
import { withFirebase } from "../components/Firebase/index";
import { Link, withRouter } from "react-router-dom";
import { withAlert } from "react-alert";

const INITIAL_STATE = {
	email: "",
	password: "",
	error: null,
};

class SignInForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { email, password } = this.state;
		this.props.firebase.auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push("/dashboard");
			})
			.then(() => {
				// eslint-disable-next-line no-restricted-globals
				location.reload();
			})
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.alert.show("Successfully Signed In!");
			})
			.catch((error) => this.setState({ error }));
		e.preventDefault();
	}

	render() {
		const { email, password, error } = this.state;
		const isInvalid = email === "" || password === "";
		return (
			<Container>
				<form onSubmit={this.onHandleSubmit}>
					<div className="form-group">
						<h3>Login</h3>
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
					<div className="form-group dflex">
						<Link to="/register">
							<span>Register</span>
						</Link>
						<Link to="/forget-pw">
							<span>Forget Password?</span>
						</Link>
					</div>
				</form>
			</Container>
		);
	}
}

const SignIn = withRouter(withFirebase(withAlert()(SignInForm)));

export default SignIn;
