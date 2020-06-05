/** @format */

import React from "react";

export const Button = ({following, usersID, idx}) => {
	return (
		<button className="btn btn-primary">
			{following.includes(usersID[idx]) ? "FOLLOWING" : "FOLLOW"}
		</button>
	);
};

export const ButtonTwo = ({onHandleUnFollow, usersID, idx}) => {
	return (
		<button
			className="btn btn-primary"
			onClick={() => {
				onHandleUnFollow(usersID[idx]);
			}}
		>
			UNFOLLOW
		</button>
	);
};

const FollowCard = ({
	user,
	usersID,
	usersImages,
	onHandleError,
    Avatar,
    children,
	idx,
}) => {
	return (
		<>
			<div className="col-6 col-md-4" key={user.email}>
				<div className="px-0">
					<div className="follow--card">
						<img
							src={
								usersImages[usersID[idx]]
									? usersImages[usersID[idx]]
									: Avatar
							}
							className="follow--avatar"
							onError={onHandleError}
						/>
						<div>
							<a href={`/dashboard/users/${usersID[idx]}`} id="1">
								<h6 className="profile--hero">
									{user.FullName}
								</h6>
								<p className="profile--hero__desc">
									@{user.UserName}
								</p>
							</a>
						</div>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default FollowCard;
