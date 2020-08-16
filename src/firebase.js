import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
const config = {
  apiKey: "AIzaSyABwV55Xx7veggQay7Q9hw5vhU04ZmB21w",
  authDomain: "todotask-d245d.firebaseapp.com",
  databaseURL: "https://todotask-d245d.firebaseio.com",
  projectId: "todotask-d245d",
  storageBucket: "todotask-d245d.appspot.com",
  messagingSenderId: "403896536837",
  appId: "1:403896536837:web:39c2e8b4a57bf24931316c",
  measurementId: "G-G513JXD545",
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);

    return this.auth.currentUser.updateProfile({ displayName: name });
  }
  async setUserDataBase(userId) {
    console.log("id", userId);
    return this.db.collection("users").doc(`${userId}`).set({
      id: userId,
      tasks: [],
      archived: [],
    });
  }
  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
  getCurrentUserId() {
    return this.auth.currentUser && this.auth.currentUser.uid;
  }
  database() {
    return this.db;
  }

  async getUserTasks(userId) {
    const tasks = await this.db.collection("users").doc(`${userId}`).get();
    return tasks.get("tasks");
  }

  writeUserData(userId, name) {
    console.log("idd", userId);
    this.db.settings({
      timestampsInSnapshots: true,
    });
    return this.db
      .collection("users")
      .doc(`${userId}`)
      .update({
        tasks: { name: "task#1" },
      })
      .then(() => {
        // Document updated successfully.
        console.log("Doc updated successfully");
      });
  }
}
export default new Firebase();
