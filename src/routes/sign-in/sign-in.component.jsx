import React from 'react'
import { 
    // auth,
    signInWithGooglePopUp, 
    createUserDocumentFromAuth, 
    // signInWithGoogleRedirect 
} from '../../utils/firebase/firebase.utils'
// import { getRedirectResult } from 'firebase/auth'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import Button from '../../components/button/button.component'


const SignIn = () => {

    // useEffect(()=>{
    //     const fetchGoogleAuth = async () => { 
    //         const response = await getRedirectResult(auth) 
    //         if(response){
    //             const userDocRef= await createUserDocumentFromAuth(response.user)
    //         }
    //         console.log(response)
    //     }
    //     fetchGoogleAuth()
    // },[])

    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopUp();
        const userDocRef= await createUserDocumentFromAuth(user)
        // console.log(response)
    }

    // const logGoogleRedirectUser = async() => {
    //     const {user} = await signInWithGoogleRedirect();
    //     // const userDocRef= await createUserDocumentFromAuth(user)
    //     console.log({user})
    // }

  return (
    <div>
        SignIn
        <Button buttonType='google' onClick={logGoogleUser}>
            Sign In With Google Popup    
        </Button>    

        <SignUpForm/>

        {/* <button onClick={logGoogleRedirectUser}>
            Sign In With Google Redirect    
        </button>    */}
    </div>
  )
}

export default SignIn