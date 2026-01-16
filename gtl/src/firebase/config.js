import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAKQPekGjdCR48znbg71ie0hDwJrna1EII",
  authDomain: "d-k-gtl.firebaseapp.com",
  databaseURL: "https://d-k-gtl-default-rtdb.firebaseio.com",
  projectId: "d-k-gtl",
  storageBucket: "d-k-gtl.firebasestorage.app",
  messagingSenderId: "126516948696",
  appId: "1:126516948696:web:89354ffb245c738d02f1ad"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;

