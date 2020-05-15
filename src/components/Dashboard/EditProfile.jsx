/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class EditProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			FullName: "",
			UserName: "",
			status: "",
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`users/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({
						FullName: userObject.FullName,
						UserName: userObject.UserName,
						status: userObject.status,
					});
				});
		});
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { FullName, UserName, status } = this.state;
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`users/${authUser.uid}`)
				.update({ FullName, UserName, status });
		});
		e.preventDefault;
	}

	render() {
		const { FullName, UserName, status } = this.state;
		return (
			<div className="row">
				<div className="col-sm justify-content">
					<form onSubmit={this.onHandleSubmit}>
						<div className="form-group">
							<h3>EDIT PROFILE</h3>
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
							<textarea
								name="status"
								value={status}
								onChange={this.onHandleChange}
								placeholder="Your status here..."
							></textarea>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary"
								type="submit"
								//disabled={isInvalid}
							>
								UPDATE PROFILE
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withFirebase(EditProfile);
