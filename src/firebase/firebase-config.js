import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { GoogleAuthProvider } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDX0UC9UYL4UNKjiS4hVQ3E6eLc9v3c_h8",
    authDomain: "planner-f2fd5.firebaseapp.com",
    projectId: "planner-f2fd5",
    storageBucket: "planner-f2fd5.appspot.com",
    messagingSenderId: "1004322964694",
    appId: "1:1004322964694:web:6715379b7fd930e3ea3577"  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db, 
    googleAuthProvider,
}
  
