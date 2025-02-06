import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB9ggkPg4CHBFSx79Yo938lq3NvNqM04xU",
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);