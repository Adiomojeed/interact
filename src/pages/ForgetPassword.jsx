/** @format */

import React, { Component } from "react";
import { withAlert } from "react-alert";
import Container from "../components/Container";
import { withFirebase } from "../components/Firebase/index";

const INITIAL_STATE = {
	email: "",
	error: null,
};

class ForgetPassword extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	componentDidMount() {
		document.title = 'Intteract - Forget Password'
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { email } = this.state;
		this.props.firebase.auth
			.sendPasswordResetEmail(email)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.alert.show("Reset link sent to your mail!");
			})
			.catch((error) => this.setState({ error }));
		e.preventDefault();
	}

	render() {
		const { email, error } = this.state;
		const isInvalid = email === "";
		return (
			<Container>
				<form onSubmit={this.onHandleSubmit}>
					<div className="form-group">
						<h2>Forgot Password</h2>
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
						{error && <p>{error.message}</p>}
					</div>
					<div className="form-group">
						<button
							className="btn btn-primary"
							type="submit"
							disabled={isInvalid}
						>
							SEND ME A RESET LINK
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

export default withFirebase(withAlert()(ForgetPassword));
