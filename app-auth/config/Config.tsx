
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAGMV1nFEMxQ3hTAEYe-W4V4g0_EX6mZ_s",
    authDomain: "ejercicio-firebase-56211.firebaseapp.com",
    databaseURL: "https://ejercicio-firebase-56211-default-rtdb.firebaseio.com",
    projectId: "ejercicio-firebase-56211",
    storageBucket: "ejercicio-firebase-56211.firebasestorage.app",
    messagingSenderId: "543904236940",
    appId: "1:543904236940:web:4bc58df9980dee577a42a9",
    measurementId: "G-RHPC17X2K3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();