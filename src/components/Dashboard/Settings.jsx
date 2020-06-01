/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAlert } from "react-alert";

class Setting extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Password: "",
			confirmPassword: "",
			error: null,
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Settings";
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { Password } = this.state;
		this.props.firebase.auth.currentUser
			.updatePassword(Password)
			.then(() => {
				this.setState({ Password: "", confirmPassword: "" });
			})
			.then(() => {
				this.props.alert.show("Password changed successfully!");
			})
			.catch((error) => {
				this.setState({ error });
			});
		e.preventDefault();
	}

	render() {
		const { Password, confirmPassword, error } = this.state;
		const isInvalid = Password === 0 || Password != confirmPassword;
		return (
			<>
				<div className="px-2 px-lg-5">
					<form onSubmit={this.onHandleSubmit}>
						<div className="form-group">
							<h5>CHANGE PASSWORD</h5>
						</div>
						<div className="form-group">
							<input
								type="password"
								name="Password"
								value={Password}
								onChange={this.onHandleChange}
								placeholder="Password"
								className="edit-control"
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								name="confirmPassword"
								value={confirmPassword}
								onChange={this.onHandleChange}
								placeholder="Confirm Password"
								className="edit-control"
							/>
						</div>
						<div className="form-group">
							{error && <p className="error">{error.message}</p>}
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary btn-update"
								type="submit"
								disabled={isInvalid}
							>
								CHANGE PASSWORD
							</button>
						</div>
					</form>
				</div>
			</>
		);
	}
}

export default withFirebase(withAlert()(Setting));
