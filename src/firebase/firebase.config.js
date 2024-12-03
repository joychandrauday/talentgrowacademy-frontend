// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_api_Key,
  authDomain: import.meta.env.VITE_aut_hDomain,
  projectId: import.meta.env.VITE_pro_jectId,
  storageBucket: import.meta.env.VITE_sto_rageBucket,
  messagingSenderId: import.meta.env.VITE_mes_sagingSenderId,
  appId: import.meta.env.VITE_app_Id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize firebase authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
