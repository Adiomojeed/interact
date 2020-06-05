export const Follow = () => {
    firebase.db
    .ref(`followers/${authUser.uid}`)
    .on("value", (snapshot) => {
        const userObject = snapshot.val();
        const arr =
            userObject === null ? [] : Object.keys(userObject);
        this.setState({ usersID: arr });
        let folArr = [];
        firebase.db.ref("users").on("value", (snapshot) => {
            const user = snapshot.val();
            for (let i in arr) {
                folArr.push(user[arr[i]]);
            }
            this.setState({ users: folArr });
            let image = new Object();
            arr.map((x) => {
                firebase.storage
                    .ref()
                    .child(`images/${x}`)
                    .getDownloadURL()
                    .then((url) => {
                        image[x] = url;
                        return image
                    });
            });
        });
    });
}