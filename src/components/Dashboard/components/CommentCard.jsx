/** @format */

import React from "react";

const CommentCard = ({ usersImages, comment, commenter, idx }) => {
	return (
		<div className="comment-card" key={idx}>
			<img src={usersImages[comment.uid]} alt="" />
			<div className="comment-content box-shadow">
				<h6>
					{commenter[comment.uid] === undefined ? (
						<p>gf</p>
					) : (
						commenter[comment.uid].FullName
					)}
					<small>
						-@
						{commenter[comment.uid] === undefined ? (
							<p>gf</p>
						) : (
							commenter[comment.uid].UserName
						)}
					</small>
				</h6>
				<p>{comment.message}</p>
			</div>
		</div>
	);
};

export default CommentCard;
