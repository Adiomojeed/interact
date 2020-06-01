/** @format */

import React from "react";

const Container = ({ children }) => {
	return (
		<div className="container vh-100">
			<div className="row vh-100 align-items-center bg-grey px">
				<div className="col col-md-8 col-lg-6 col-xl-4 offset-md-2 offset-lg-3 offset-xl-4 bg-white box-shadow py">
					<div className='text-center'>
						<h1 className="hero">Intteract</h1>
						<small className="hero-description">
							A social media platform <br />
						</small>
					</div>
					<div className="w-100 px-2">
					{children}
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default Container;
