import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBcORERY6YPc6To164dvUieXylpk2QiMlY",
  authDomain: "project-cyber-de5b3.firebaseapp.com",
  databaseURL: "https://project-cyber-de5b3-default-rtdb.firebaseio.com",
  projectId: "project-cyber-de5b3",
  storageBucket: "project-cyber-de5b3.appspot.com",
  messagingSenderId: "318125212363",
  appId: "1:318125212363:web:bcbd7231282e2cdb66914e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};