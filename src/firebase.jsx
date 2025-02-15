import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCD3LYB330J8oGaCzKIB14TcYTtndsFRyE",
    authDomain: "todo-app-46069.firebaseapp.com",
    projectId: "todo-app-46069",
    storageBucket: "todo-app-46069.firebasestorage.app",
    messagingSenderId: "609405061203",
    appId: "1:609405061203:web:1965d45f3d727105b21ea6"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);