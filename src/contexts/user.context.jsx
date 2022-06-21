import { createContext,useState,useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangeListener } from "../utils/firebase/firebase.utils";


// As the actual value you want to access
export const UserContext = createContext({
    user:null,
    setCurrentUser : () => null
})


export const UserProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null)
    const value={currentUser,setCurrentUser}

    useEffect(()=>{
       const unSubscribe = onAuthStateChangeListener((user) => { 

        if(user){
            createUserDocumentFromAuth(user)
        }
        setCurrentUser(user)
       })
       
       return unSubscribe
    },[])

    return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
    )
}
