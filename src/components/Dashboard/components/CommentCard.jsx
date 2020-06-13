/** @format */

import React from "react";

const CommentCard = ({ usersImages, comment, commenter, idx }) => {
	return (
		<div className="comment-card" key={idx}>
			<img src={usersImages[comment.uid]} alt="" />
			<div className="comment-content box-shadow">
				{commenter[comment.uid] === undefined ? (
					""
				) : (
					<h6>
						<a href={`/dashboard/users/${comment.uid}`}>
							{commenter[comment.uid].FullName}{" "}
						</a>
						<small>
							{comment.date} - {comment.time}
						</small>
					</h6>
				)}

				<p>{comment.message}</p>
			</div>
		</div>
	);
};

export default CommentCard;
