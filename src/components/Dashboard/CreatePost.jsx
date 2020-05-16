/** @format */

import React, { Component } from "react";
import { Entropy } from "entropy-string";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";

class CreatePost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: "",
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	//componentDidMount() {
	//	this.props.firebase.auth.onAuthStateChanged((authUser) => {
	//		this.props.firebase.db
	//			.ref(`users/${authUser.uid}`)
	//			.on("value", (snapshot) => {
	//				const userObject = snapshot.val();
	//				this.setState({
	//					FullName: userObject.FullName,
	//					UserName: userObject.UserName,
	//					post: userObject.post,
	//				});
	//			});
	//	});
	//}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { post } = this.state;
		let totalDate = new Date()
		let date = totalDate.toLocaleDateString()
		let time = totalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		const entropy = new Entropy();
		const postID = entropy.string();
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`posts/${authUser.uid}/${postID}`)
				.set({ post, date, time, likes: 0 });
		});
		this.props.history.push("/dashboard/profile");
		e.preventDefault;
	}

	render() {
		const { post } = this.state;
		return (
			<div className="row">
				<div className="col-sm justify-content">
					<form onSubmit={this.onHandleSubmit}>
						<div className="form-group">
							<h3>CREATE A POST</h3>
						</div>
						<div className="form-group">
							<textarea
								name="post"
								value={post}
								onChange={this.onHandleChange}
								placeholder="Your post here..."
							></textarea>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary"
								type="submit"
								//disabled={isInvalid}
							>
								POST
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(withFirebase(CreatePost));
