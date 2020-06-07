/** @format */

import React from "react";

const PostCard = ({
	post,
	userDetails,
	avatar,
	onHandleError,
	onHandleClick,
	comments,
}) => {
	return (
		<>
			<div className="post--card box-shadow">
				<a href={`/dashboard/posts/${userDetails.uid}/${post.postID}`}>
					<div className="post--card__header">
						<img
							src={avatar}
							className="post--avatar"
							onError={onHandleError}
							alt=""
						/>
						<div>
							<h6 className="profile--hero">
								{userDetails.FullName}
							</h6>
							<p className="profile--hero__desc">
								@{userDetails.UserName}
							</p>
						</div>
					</div>
				</a>
				<div className="post--card__body">
					<p>{post.post}</p>
					<p className="details">
						<span>{post.time}</span>
						<span>{post.date}</span>
					</p>
					<p className="requests">
						<a
							href={`/dashboard/posts/${userDetails.uid}/${post.postID}`}
						>
							<span>
								<i className="fas fa-comments"></i>
								{comments || 0}
							</span>
						</a>
						<span
							onClick={() => {
								onHandleClick(post);
							}}
							className='error'
						>
							<i className="fas fa-heart error"></i>
							{post.likes ? Object.keys(post.likes).length : 0}
						</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default PostCard;
