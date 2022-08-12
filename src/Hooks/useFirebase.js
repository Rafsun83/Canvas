import { getAuth, signInWithPopup, GoogleAuthProvider, signOut,onAuthStateChanged, } from "firebase/auth";
import { useEffect,useState  } from "react";
import FirebaseInitializeAuth from './../Component/SingUp/Firebase/Firebase.init';

FirebaseInitializeAuth();
const useFirebase = () => {
    const [users, setUsers] = useState({})

    const auth = getAuth()
    const GoogleProvider = new GoogleAuthProvider();

    //signIn With Google
    const siginWithGoogle = () => {     
     return (
        signInWithPopup(auth, GoogleProvider)
            .then(result => {
                setUsers(result.user)
            })
     )
    }

    //user Sate ovserver
    useEffect(() => {
      const unSubscribed = onAuthStateChanged(auth, (user) => {
            if(user){
                setUsers(user)
            }
            else{
                setUsers({})
            }
        })
        return ()=>unSubscribed;
    }, [])

    //User logoOut
    const logOut = () => {
        signOut(auth)
            .then(() => {

            })
    }

    return {
        users,
        logOut,
        siginWithGoogle
        
    }
}
export default useFirebase;