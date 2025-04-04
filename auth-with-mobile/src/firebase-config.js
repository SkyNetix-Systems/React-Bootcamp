import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAW0C7kme77BkKMZd07OXJjQmY29CruDBc",
    authDomain: "auth-with-mobile-b3308.firebaseapp.com",
    projectId: "auth-with-mobile-b3308",
    storageBucket: "auth-with-mobile-b3308.firebasestorage.app",
    messagingSenderId: "971193953133",
    appId: "1:971193953133:web:9af8ddcb503a69843e8864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
