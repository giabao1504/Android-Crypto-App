// config.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAY9WJ3fqjsc03etP0Kj8n-D6KtQPL9JOg",
  authDomain: "crypto-b9821.firebaseapp.com",
  projectId: "crypto-b9821",
  storageBucket: "crypto-b9821.appspot.com",
  messagingSenderId: "163903377830",
  appId: "1:163903377830:web:f4a0f1eb8a1cbd0aad7f67",
  measurementId: "G-8BQ99T9YRG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };