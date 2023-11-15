import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtAME3fYYf-bqOQr__-iIjoeb-Yuj9udY",
  authDomain: "productdesignproju.firebaseapp.com",
  projectId: "productdesignproju",
  storageBucket: "productdesignproju.appspot.com",
  messagingSenderId: "820664706357",
  appId: "1:820664706357:web:26e05d08d9b6f58805587c",
  measurementId: "G-0P0H4Q406X",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
