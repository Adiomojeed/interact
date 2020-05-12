/** @format */

import React, { Component } from "react";
import Container from "../components/Container";
import { withFirebase } from "../components/Firebase/index";
import { Link, withRouter } from "react-router-dom";

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
			.catch((error) => this.setState({ error }));
		e.preventDefault();
	}

	render() {
		const { email, password, error } = this.state;
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
						<button className="btn btn-primary" type="submit">
							SIGN IN
						</button>
					</div>
					<div className="form-group dflex">
						<Link to="/register">
							<a>Register</a>
						</Link>
						<Link to="/forget-pw">
							<a>Forget Password?</a>
						</Link>
					</div>
				</form>
			</Container>
		);
	}
}

const SignIn = withRouter(withFirebase(SignInForm));

export default SignIn;
