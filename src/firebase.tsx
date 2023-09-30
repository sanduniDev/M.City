import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAFWR-9CAxZGHN8qo0dVdkIt7XNQL8FkgI",
  authDomain: "mcity-15941.firebaseapp.com",
  projectId: "mcity-15941",
  storageBucket: "mcity-15941.appspot.com",
  messagingSenderId: "625242738567",
  appId: "1:625242738567:web:a5f759693334f3874f0d22",
  measurementId: "G-D5X7G1HNBX"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
