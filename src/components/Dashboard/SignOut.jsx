/** @format */

import React from "react";
import { withFirebase } from "../Firebase";

const SignOut = ({ firebase }) => {
	return (
		<button
			onClick={() => {
				firebase.auth.signOut();
			}}
		>
			Sign Out
		</button>
	);
};

export default withFirebase(SignOut);
