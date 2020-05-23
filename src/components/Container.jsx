/** @format */

import React from "react";

const Container = ({ children }) => {
	return (
		<div className="container">
			<div className="row vh-100 align-items-center">
				<div className="col col-lg-6 d-flex justify-content-center fixed relative">
					<div className='opacity'>
						<h1 className="hero">Intteract</h1>
						<small className="hero-description text-right">
							A social media platform <br />
						</small>
					</div>
				</div>
				<div className="col col-lg-6 justify-content-center px-3 px-md-5 px-lg-2 px-xl-5 z-index">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Container;
