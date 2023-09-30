import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// import { cityDb } from './temp/m-city-export';

const firebaseConfig = {
  apiKey: "AIzaSyAFWR-9CAxZGHN8qo0dVdkIt7XNQL8FkgI",
  authDomain: "mcity-15941.firebaseapp.com",
  projectId: "mcity-15941",
  storageBucket: "mcity-15941.appspot.com",
  messagingSenderId: "625242738567",
  appId: "1:625242738567:web:a5f759693334f3874f0d22",
  measurementId: "G-D5X7G1HNBX"
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: Analytics = getAnalytics(app);
export const auth: Auth = getAuth(app);
export const firestore = getFirestore(app);

// Firestore collections
const matchesCollection = collection(firestore, 'matches');
const playersCollection = collection(firestore, 'players');
const positionsCollection = collection(firestore, 'positions');
const promotionsCollection = collection(firestore, 'promotions');
const teamsCollection = collection(firestore, 'teams');

// Adding data to collections
// cityDb.matches.forEach(async item => await addDoc(matchesCollection, item));
// cityDb.players.forEach(async item => await addDoc(playersCollection, item));
// cityDb.positions.forEach(async item => await addDoc(positionsCollection, item));
// cityDb.promotions.forEach(async item => await addDoc(promotionsCollection, item));
// cityDb.teams.forEach(async item => await addDoc(teamsCollection, item));

export {
  matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection
};
