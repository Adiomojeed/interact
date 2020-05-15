/** @format */

import React, { Component } from "react";
import Avatar from "../../assets/images/male.png";
import { withFirebase } from "../Firebase";
import { NavLink } from "react-router-dom";

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
			followers: "",
			following: "",
		};
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged((authUser) => {
			this.props.firebase.db
				.ref(`users/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ user: userObject });
				});
			this.props.firebase.db
				.ref(`followers/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ followers: userObject });
				});
			this.props.firebase.db
				.ref(`following/${authUser.uid}`)
				.on("value", (snapshot) => {
					const userObject = snapshot.val();
					this.setState({ following: userObject });
				});
		});
	}

	render() {
		const { user, followers, following } = this.state;
		return (
			<div className="row">
				<div className="col-sm px-2 py-3">
					<div className="card"></div>
					<div className="profile--card">
						<img src={Avatar} className="profile--avatar" alt="" />
						<div className="profile--header">
							<div>
								<h5 className="profile--hero">
									{user.FullName}
								</h5>
								<p className="profile--hero__desc">
									@{user.UserName}
								</p>
							</div>
							<NavLink to="/dashboard/edit">
								<button className="btn-edit">
									EDIT PROFILE
								</button>
							</NavLink>
						</div>
						<h6 className="status">{user.status}</h6>
						<p className="followers">
							<span>{followers.followers} Followers</span>
							<span>{following.following} Following</span>
						</p>
						<div className="profile--header">
							<div>
								<h5 className="profile--hero">POSTS</h5>
							</div>
							<button className="btn-edit">CREATE A POST</button>
						</div>
					</div>
					<div className="card-block">
						<div className="post--card">
							<div className="post--card__header">
								<img
									src={Avatar}
									className="post--avatar"
									alt=""
								/>
								<div>
									<h6 className="profile--hero">
										Adio Mojeed
									</h6>
									<p className="profile--hero__desc">
										@codeLeaf
									</p>
								</div>
							</div>
							<div className="post--card__body">
								<p>
									I am the Lion himself, I am the war, I am
									the liquid metal, I am the fight, I am the
									indabosky bahose
								</p>
								<p className="details">
									<span>10:40pm</span>
									<span>02/05/2020</span>
								</p>
								<p className="requests">
									<span>
										<i className="fas fa-moon"></i>
									</span>
									<span>
										<i className="fas fa-lightbulb"></i>
									</span>
								</p>
							</div>
						</div>
						<div className="post--card">
							<div className="post--card__header">
								<img
									src={Avatar}
									className="post--avatar"
									alt=""
								/>
								<div>
									<h6 className="profile--hero">
										Adio Mojeed
									</h6>
									<p className="profile--hero__desc">
										@codeLeaf
									</p>
								</div>
							</div>
							<div className="post--card__body">
								<p>
									I am the Lion himself, I am the war, I am
									the liquid metal, I am the fight, I am the
									indabosky bahose
								</p>
								<p className="details">
									<span>10:40pm</span>
									<span>02/05/2020</span>
								</p>
								<p className="requests">
									<span>
										<i className="fas fa-moon"></i>
									</span>
									<span>
										<i className="fas fa-lightbulb"></i>
									</span>
								</p>
							</div>
						</div>
						<div className="post--card">
							<div className="post--card__header">
								<img
									src={Avatar}
									className="post--avatar"
									alt=""
								/>
								<div>
									<h6 className="profile--hero">
										Adio Mojeed
									</h6>
									<p className="profile--hero__desc">
										@codeLeaf
									</p>
								</div>
							</div>
							<div className="post--card__body">
								<p>
									I am the Lion himself, I am the war, I am
									the liquid metal, I am the fight, I am the
									indabosky bahose
								</p>
								<p className="details">
									<span>10:40pm</span>
									<span>02/05/2020</span>
								</p>
								<p className="requests">
									<span>
										<i className="fas fa-moon"></i>
									</span>
									<span>
										<i className="fas fa-lightbulb"></i>
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withFirebase(Profile);
