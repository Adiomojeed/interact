/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import { navigate } from "@reach/router";

const withAuthorization = (condition) => (Component) => {
	class withAuthorization extends React.Component {
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(
				(authUser) => {
					if (!condition(authUser)) {
						navigate("/");
					}
				}
			);
		}

		componentWillUnmount() {
			this.listener();
		}

		render() {
			return <Component {...this.props} />;
		}
	}

	return (withFirebase(withAuthorization));
};

export default withAuthorization;
