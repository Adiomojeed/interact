/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import Avatar from "../../assets/images/male.png";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		};
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db.ref(`users`).on("value", (snapshot) => {
				const userObject = snapshot.val();
				const users = Object.keys(userObject).map((a) => ({
					...userObject[a],
					userID: a,
				}));
				this.setState({ users });
			});
			let a = this.props.firebase.storage
				.ref()
				.child(`images`)
				.getDownloadURL()
				console.log(a)
				
		});
	}

	render() {
		const { users } = this.state;
		return (
			<div className="row">
				<div className="col">
					<div className="users-block px px-lg-4">
						{users.map((user) => (
							<div className="post--card" key={user.userID}>
								<div className="post--card__header">
									<img
										src={Avatar}
										className="post--avatar"
										alt=""
									/>
									<div>
										<h6 className="profile--hero">
											{user.FullName}
										</h6>
										<p className="profile--hero__desc">
											@{user.UserName}
										</p>
										<p className="profile--hero__follower">
											codeLeaf
										</p>
									</div>
									<button className="btn btn-sm btn-primary">
										Follow
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withFirebase(Search);
