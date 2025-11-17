import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getFirestore, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

apiKey: "AIzaSyDtqw6XjmQYKRykUmgSEq9LpHrxmFRKufs",

  authDomain: "projeto-react-native-curemais.firebaseapp.com",

  projectId: "projeto-react-native-curemais",

  storageBucket: "projeto-react-native-curemais.firebasestorage.app",

  messagingSenderId: "719071957902",

  appId: "1:719071957902:web:cd2c75ede8cc7d87f2cadf"


};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { addDoc, auth, collection, db, doc, getDoc, onSnapshot, orderBy, query, setDoc, where };
