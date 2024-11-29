// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmRLIlWmrG6luirX8ElFD6XXqlVF05CNk",
  authDomain: "ai-visualization-web-app.firebaseapp.com",
  projectId: "ai-visualization-web-app",
  storageBucket: "ai-visualization-web-app.firebasestorage.app",
  messagingSenderId: "471686906282",
  appId: "1:471686906282:web:caf4b441312f11bd0a6bd3",
  measurementId: "G-NZ8TTXJL1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  auth= getAuth(app);



export {auth};
// const analytics = getAnalytics(app);