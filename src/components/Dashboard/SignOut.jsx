/** @format */

import React from "react";
import { withFirebase } from "../Firebase";

const SignOut = ({ firebase }) => {
	return (
		<React.Fragment>
			<button type="button" className="sign-out" id="open-modal">
				<p className="nav-tex">SIGN OUT</p>
			</button>
			<div id="myModal" className="myModal">
				<div className="modal-content">
					<div className="headers">
						<h3>SignOut?</h3>
					</div>
					<div className="bodys">
						<button
							className="footer"
							onClick={() => {
								firebase.auth.signOut();
							}}
						>
							Yes
						</button>
						<button className="negate">No</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default withFirebase(SignOut);
