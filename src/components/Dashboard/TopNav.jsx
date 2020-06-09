/** @format */

import React from "react";
import { Link } from "@reach/router";

const TopNav = () => {
	return (
		<nav className="nav box-shadow">
			<a href="/dashboard">
				<h3 className="logo">Intteract</h3>
			</a>
			<div>
				<Link to="/dashboard/settings">
					<i className="fas fa-cog"></i>
				</Link>
				<i className="fas fa-stream" id="open"></i>
			</div>
		</nav>
	);
};

export default TopNav;
