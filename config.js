import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getAnalytics } from "firebase/compat/analytics";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMcIsxZgBvxBdUzHBb9mkyGV08wtwgdaA",
  authDomain: "bfinder-88e2e.firebaseapp.com",
  databaseURL:
    "https://bfinder-88e2e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bfinder-88e2e",
  storageBucket: "bfinder-88e2e.appspot.com",
  messagingSenderId: "194072029678",
  appId: "1:194072029678:web:936c34c59a80a13b1206ff",
  measurementId: "G-FXJPL1S3RN",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const db = getDatabase();
export { db };

// const analytics = getAnalytics(app);
