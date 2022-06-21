// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'


import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyugL3xbQFrZY9HxBNlHwTZWXefKPcJyM",
  authDomain: "crwn-db-cb840.firebaseapp.com",
  projectId: "crwn-db-cb840",
  storageBucket: "crwn-db-cb840.appspot.com",
  messagingSenderId: "54867369993",
  appId: "1:54867369993:web:742f5dddbf5adf87b918d8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth,provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    console.log(userAuth)
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            } )
        }catch(error){
            console.log("Error Creating the User ",error.message)
        }
    }

    return userDocRef
}
