import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genweb-ai-d5654.firebaseapp.com",
  projectId: "genweb-ai-d5654",
  storageBucket: "genweb-ai-d5654.firebasestorage.app",
  messagingSenderId: "228850532931",
  appId: "1:228850532931:web:b81dfe4c30adf576ab4af6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };