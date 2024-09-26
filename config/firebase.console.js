import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrAPYkRW-CX63BSQciRc0JX-jgoUc_Kb4",
  authDomain: "mindmend-984f4.firebaseapp.com",
  projectId: "mindmend-984f4",
  storageBucket: "mindmend-984f4.appspot.com",
  messagingSenderId: "61928724876",
  appId: "1:61928724876:web:caf8cc824e39c2ffd61ea9",
  measurementId: "G-FS6SF8JS7R"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firebaseAuth = getAuth(app)
const firestoreDB =  getFirestore(app)

export {app, firebaseAuth, firestoreDB}