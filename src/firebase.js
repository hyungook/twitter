import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// console.log(process.env.REACT_APP_API_KEY)
// console.log(process.env.REACT_APP_AUTH_DOMAIN)


  // Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();