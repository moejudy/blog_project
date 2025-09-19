// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function signUp(email: string, password: string, blogTitle: string, blogPresentation: string) {
  try {
    // await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    // const res = await auth.signInWithEmailAndPassword(email, password);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user

    await setDoc(doc(db, "blogs", user.uid), {
      email: email,
      blog_title: blogTitle,
      introduction: blogPresentation,
      date: new Date().toISOString()
    });

    return user;

  } catch (error: any) {
    console.error("Error signing up:", error.message);
  }
}

export async function signIn(email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return true;

  } catch (error: any) {
    console.error("Error signing in;", error.message);
    return false;
  }
}

export async function logOut() {
  try { 
    await signOut(auth);
    console.log("user Signed out");
  } catch (error: any) {
    console.error("Error, signing out:", error.message)
  }
};