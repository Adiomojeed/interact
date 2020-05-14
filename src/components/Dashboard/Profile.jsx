/** @format */

import React, { Component } from "react";
import Avatar from "../../assets/images/male.png";

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm px-2 py-3">
					<div className="card"></div>
					<div className="profile--card">
						<img src={Avatar} className="profile--avatar" alt="" />
						<div className="profile--header">
							<div>
								<h5 className="profile--hero">Adio Mojeed</h5>
								<p className="profile--hero__desc">@codeLeaf</p>
							</div>
							<button className="btn-edit">EDIT PROFILE</button>
						</div>
						<h6 className="status">
							I am a web developer who codes for the fun of the
							web. I am specialized in frontend development using
							ReactJS
						</h6>
						<p className="followers">
							<span>100 Followers</span>
							<span>100 Following</span>
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
									<span><i className="fas fa-moon"></i></span>
									<span><i className="fas fa-lightbulb"></i></span>
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
									<span><i className="fas fa-moon"></i></span>
									<span><i className="fas fa-lightbulb"></i></span>
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
									<span><i className="fas fa-moon"></i></span>
									<span><i className="fas fa-lightbulb"></i></span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
