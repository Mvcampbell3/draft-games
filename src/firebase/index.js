import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// This is the example set function
export function writeUserData(userId, userObject) {
    set(ref(db, "users/" + userId), userObject);
}
/**
 * @name listenToDatabase
 * @desciption creates onValue observer to firebase database
 * @param {string} path reference path to the database
 * @param {function} callback to do with the data
 */
export function listenToDatabase(path, callback) {
    const dbRef = ref(db, path);
    onValue(
        dbRef,
        (snapshot) => {
            const data = snapshot.val();
            callback(data);
        },
        (error) => {
            console.error(error);
        },
    );
}

/**
 * @name cleanUpDatabase
 * @description unsubscribe from an existing onValue observer
 * @param {string} path reference path to the database
 */
export function cleanUpDatabase(path) {
    const dbRef = ref(db, path);
    off(dbRef, "value");
}

export default app;
