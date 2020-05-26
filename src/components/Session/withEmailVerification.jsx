/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";

const needsEmailVerification = (authUser) =>
	authUser &&
	!authUser.emailVerified &&
	authUser.providerData
		.map((provider) => provider.providerId)
		.includes("password");

const withEmailVerification = (Component) => {
	class withEmailVerification extends React.Component {
		constructor(props) {
			super(props);
			this.state = { isSent: false };
			this.onSendEmailVerification = this.onSendEmailVerification.bind(
				this
			);
		}

		onSendEmailVerification() {
			this.props.firebase.auth.currentUser
				.sendEmailVerification({
					url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
				})
				.then(() => this.setState({ isSent: true }));
		}

		render() {
			return (
				<AuthUserContext.Consumer>
					{(authUser) =>
						needsEmailVerification(authUser) ? (
							<div className="row">
								<div className="col col-lg-6 offset-lg-3 px pt">
									{this.state.isSent ? (
										<h5 className="text-center">
											Confirmation Mail Resent: Check you
											mail inbox (and spam) or send
											another verification mail and
											refresh this page after verification
										</h5>
									) : (
										<h5 className="text-center">
											Verify your E-Mail: Check you mail
											inbox (and spam) or send another
											verification mail and refresh this
											page after verification
										</h5>
									)}
									<button
										className="btn btn-primary btn-update"
										type="button"
										onClick={this.onSendEmailVerification}
										disabled={this.state.isSent}
									>
										Resend confirmation Mail
									</button>
								</div>
							</div>
						) : (
							<Component {...this.props} />
						)
					}
				</AuthUserContext.Consumer>
			);
		}
	}
	return withFirebase(withEmailVerification);
};

export default withEmailVerification;
