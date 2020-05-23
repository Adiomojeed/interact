/** @format */

import React, { Component } from "react";
import Container from "../components/Container";
import { withFirebase } from "../components/Firebase/index";
import { Link, withRouter } from "react-router-dom";
import { withAlert } from "react-alert";

const INITIAL_STATE = {
	FullName: "",
	UserName: "",
	email: "",
	passwordOne: "",
	passwordTwo: "",
	status: "No Status",
	//followers: 0,
	//following: 0,
	post: "No Post Found",
	error: null,
};

class SignUpForm extends Component {
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
		const {
			FullName,
			UserName,
			status,
			email,
			passwordOne,
			//followers,
			//following,
		} = this.state;
		this.props.firebase.auth
			.createUserWithEmailAndPassword(email, passwordOne)
			.then((authUser) => {
				this.props.firebase.db
					.ref(`users/${authUser.user.uid}`)
					.set({ FullName, UserName, email, status });
				this.props.firebase.db
					.ref(`followers/${authUser.user.uid}`)
					//.set({ followers });
				this.props.firebase.db
					.ref(`following/${authUser.user.uid}`)
					//.set({ following });
				//this.props.firebase.db
				//	.ref(`posts/${authUser.user.uid}`)
				//	.set({ post });
			})
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
				this.props.alert.show("Successfully Signed Up!");
			})
			.catch((error) => this.setState({ error }));
		e.preventDefault();
	}

	render() {
		const {
			FullName,
			email,
			UserName,
			passwordOne,
			passwordTwo,
			error,
		} = this.state;
		const isInvalid =
			FullName === "" ||
			email === "" ||
			passwordOne === "" ||
			passwordOne !== passwordTwo;
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
							name="passwordOne"
							value={passwordOne}
							onChange={this.onHandleChange}
							placeholder="Password"
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							name="passwordTwo"
							value={passwordTwo}
							onChange={this.onHandleChange}
							placeholder="Confirm Password"
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
