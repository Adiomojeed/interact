/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import { withEmailVerification, withAuthorization } from "../Session";

const SignOut = ({ firebase }) => {
	return (
		<React.Fragment>
			<button type="button" className="sign-out" id="open-modal">
				SIGN OUT
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

const condition = (authUser) => authUser != null;

export default withEmailVerification(withAuthorization(condition)(withFirebase(SignOut)));
