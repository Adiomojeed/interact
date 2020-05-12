/** @format */

import React from "react";

const Container = ({ children }) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-6 col-sm align-items-center justify-content">
					<div>
						<h1 className="hero">Interact</h1>
						<p className="hero-description">
							A social media platform
						</p>
					</div>
				</div>
				<div className="col-6 col-sm justify-content justify-content--lg__none align-items-center vh-100">
					{ children }
				</div>
			</div>
		</div>
	);
}

export default Container;
