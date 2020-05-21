/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
//import Avatar from '../../assets/images/male.png'

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			FullName: "",
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db.ref(`users`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				console.log(userObject);
			});
		});
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { FullName, UserName, status } = this.state;
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db.ref("users").on("value", (snapshot) => {
				const searchResult = snapshot.val();
				console.log(searchResult);
			});
		});
		//this.props.history.push("/dashboard/profile");
		//setTimeout(() => {
		//	location.reload();
		//}, 2000);
		e.preventDefault;
	}

	render() {
		const { FullName } = this.state;
		return (
			<div className="row">
				<div className="col-sm justify-content">
					<form onSubmit={this.onHandleSubmit}>
						<div className="form-group">
							<h3>SEARCH USERS</h3>
						</div>
						<div className="form-group">
							<input
								type="text"
								name="FullName"
								value={FullName}
								onChange={this.onHandleChange}
								placeholder="Full Name"
								className="edit"
							/>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary btn-update"
								type="submit"
							>
								SEARCH
							</button>
						</div>
					</form>
					<button
						className="btn btn-primary btn-update"
                        type="submit"
                        onClick={this.onHandleSubmit}
					>
						SEARCH
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(withFirebase(Settings));
