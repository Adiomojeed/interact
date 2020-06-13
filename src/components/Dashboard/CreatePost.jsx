/** @format */

import React, { Component } from "react";
import { Entropy } from "entropy-string";
import { navigate } from "@reach/router";
import { withFirebase } from "../Firebase";

class CreatePost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: "",
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Create post";
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { post } = this.state;
		const totalDate = new Date();
		const date = totalDate.toLocaleDateString();
		const time = totalDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		const ms = totalDate.getTime();
		const entropy = new Entropy();
		const postID = entropy.string();
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`posts/${authUser.uid}/${postID}`)
				.set({ post, date, time, ms, likes: 0, comments: 0 });
		});
		navigate("/dashboard");

		e.preventDefault();
	}

	render() {
		const { post } = this.state;
		return (
			<>
				<div className="px px-lg-5">
					<form onSubmit={this.onHandleSubmit}>
						<div className="form-group">
							<h4>CREATE A POST</h4>
						</div>
						<div className="form-group">
							<textarea
								name="post"
								value={post}
								onChange={this.onHandleChange}
								placeholder="Your post here..."
								rows="15"
							></textarea>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary btn-update"
								type="submit"
							>
								POST
							</button>
						</div>
					</form>
				</div>
			</>
		);
	}
}

export default withFirebase(CreatePost);
