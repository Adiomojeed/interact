/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import Avatar from "../../assets/images/male.png";
import MoonLoader from "react-spinners/MoonLoader";
import FollowCard, { Button } from "./components/FollowCard";

class Followers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			usersImages: [],
			usersID: [],
			following: [],
		};

		this.onHandleError = this.onHandleError.bind(this);
	}

	componentDidMount() {
		document.title = "Intteract - Followers";
		const { firebase } = this.props;
		firebase.auth.onAuthStateChanged((authUser) => {
			// Fixed
			firebase.db.ref(`followers/${authUser.uid}`).on("value", (snapshot) => {
					const userObject = snapshot.val();
					const arr =
						userObject === null ? [] : Object.keys(userObject);
					this.setState({ usersID: arr });
					let folArr = [];
					firebase.db.ref("users").on("value", (snapshot) => {
						const user = snapshot.val();
						for (let i in arr) {
							folArr.push(user[arr[i]]);
						}
						this.setState({ users: folArr });
						let image = new Object();
						arr.map((x) => {
							firebase.storage
								.ref()
								.child(`images/${x}`)
								.getDownloadURL()
								.then((url) => {
									image[x] = url;
									this.setState({ usersImages: image });
								});
							});
					});
				});

			firebase.db.ref(`following/${authUser.uid}`).on("value", (snapshot) => {
					const userObject = snapshot.val();
					const following =
						userObject === null ? [] : Object.keys(userObject);
					this.setState({ following });
				});
		});
	}

	componentWillUnmount() {

	}

	onHandleError(e) {
		e.target.src = Avatar;
	}

	render() {
		const { users, usersImages, usersID, following } = this.state;

		if (users.length === 0) {
			return (
				<div>
					<MoonLoader
						css="margin: 0 auto; margin-top: 20px"
						size={50}
						color={"#123abc"}
						loading={this.state.loading}
					/>
					<h6>You have no follower</h6>
				</div>
			);
		}
		return (
			<>
				<div>
					<h5 className="follow-head">Your followers</h5>
				</div>
				<div className="users-block">
					<div className="row">
						{users.map((user, idx) => (
							<FollowCard
								key={usersID[idx]}
								idx={idx}
								user={user}
								usersID={usersID}
								usersImages={usersImages}
								Avatar={Avatar}
								following={following}
								onHandleError={this.onHandleError}
							>
								<Button following={following} usersID={usersID} idx={idx} />
							</FollowCard>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default withFirebase(Followers);
