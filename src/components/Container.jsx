/** @format */

import React from "react";

const Container = ({ children }) => {
	return (
		<div className="container vh-100">
			<div className="row vh-100 align-items-center bg-grey px">
				<div className="col col-lg-6 offset-lg-3 bg-white box-shadow py">
					<div className='text-center'>
						<h1 className="hero">Intteract</h1>
						<small className="hero-description">
							A social media platform <br />
						</small>
					</div>
					<div className="w-100 px-2 px-lg-2 px-xl-5 px-md-5">
					{children}
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default Container;
