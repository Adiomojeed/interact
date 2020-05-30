/** @format */

import app from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.database();
		this.storage = app.storage();
	}

	doCreateUserWithEmailAndPassword(email, password) {
		return this.auth.createUserWithEmailAndPassword(email, password);
	}

	doSignInWithEmailAndPassword(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	doResetPassword(email) {
		return this.auth.sendPasswordResetEmail(email);
	}

	doChangePassword(password) {
		return this.auth.currentUser.updatePassword(password);
	}

	doSignOut() {
		return this.auth.signOut();
	}

	user(link) {
		return this.db.ref(link);
	}
}

export default Firebase;
