import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const FirebaseInitializeAuth= () =>{
    initializeApp(firebaseConfig);
}
export default FirebaseInitializeAuth;