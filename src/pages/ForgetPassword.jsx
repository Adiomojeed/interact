/** @format */

import React, { Component } from "react";
import Container from "../components/Container";
import { withFirebase } from "../components/Firebase/index";
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";

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

	componentWillMount() {
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
						<h3>Forgot Password</h3>
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
					<div className="form-group dflex">
						<Link to="/">
							<a>Sign In</a>
						</Link>
					</div>
				</form>
			</Container>
		);
	}
}

export default withFirebase(withAlert()(ForgetPassword));
