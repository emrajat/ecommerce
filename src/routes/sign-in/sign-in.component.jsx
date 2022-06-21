import React from 'react'
import { signInWithGooglePopUp, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'


const SignIn = () => {
    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopUp();
        const userDocRef= await createUserDocumentFromAuth(user)
        // console.log(response)
    }
  return (
    <div>
        SignIn
        <button onClick={logGoogleUser}>
            Sign In With Google Popup    
        </button>    
    </div>
  )
}

export default SignIn