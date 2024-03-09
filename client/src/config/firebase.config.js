import { getApp, getApps, initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYpVLVeX011NqrNe2c2V6RJrOU_-MhYHU",
  authDomain: "electronic-store-f7c2e.firebaseapp.com",
  projectId: "electronic-store-f7c2e",
  storageBucket: "electronic-store-f7c2e.appspot.com",
  messagingSenderId: "178553750794",
  appId: "1:178553750794:web:03c2349865f0d3601b66f3",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
