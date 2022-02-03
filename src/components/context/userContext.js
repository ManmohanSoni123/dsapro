import { createContext,useContext,useState,useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged, signOut
} from "firebase/auth"
import {auth} from "../firebase"
import { Navigate,useNavigate } from "react-router-dom";
import Login from "../login/login";
const userAuthContext = createContext(null)

export function UserAuthContextProvider({ children }) {
    
    const [user,setUser] = useState(null);
    //  const navigate = useNavigate();
    function register(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function login(email,password){
        localStorage.setItem('user',true);

        return signInWithEmailAndPassword(auth,email,password)
        // .then((res) =>{
        //     localStorage.setItem('user',res);
            
        // })
    }
      const logout = () => {
        signOut(auth).then((res) => {
            localStorage.clear();
            // <Navigate to="/" element = {<Login/>} />
            // navigate("/");
        }).catch(err => {
            console.log(err);
            
        });
    }
     useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            console.log(currentUser);
             if(currentUser)
            setUser(currentUser);
         });
         return () => {
             unsubscribe();
         }
     });
    return <userAuthContext.Provider value={{user,register,login,logout }} >{children}</userAuthContext.Provider>
}
export function useUserAuth() {
    return useContext(userAuthContext)
}