import React,{useState} from 'react'
import { 
  // auth,
  signInWithGooglePopUp, 
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword 
  // signInWithGoogleRedirect 
} from '../../utils/firebase/firebase.utils'
// import { getRedirectResult } from 'firebase/auth'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'


const defaultFormFields = {
  email:'',
  password: '',
}

const SignInForm = () => {

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

    const signInWithGoogle = async() => {
      const {user} = await signInWithGooglePopUp();
      await createUserDocumentFromAuth(user)
      // console.log(response)
  }

  // const logGoogleRedirectUser = async() => {
  //     const {user} = await signInWithGoogleRedirect();
  //     // const userDocRef= await createUserDocumentFromAuth(user)
  //     console.log({user})
  // }

const [formFields,setFormFields] = useState(defaultFormFields)
const {email,password} = formFields

const handleChange = (event) => {
  const {name,value} = event.target
  setFormFields({...formFields,[name]:value})
}

console.log(formFields)

const resetFormFields = () => {
  setFormFields(defaultFormFields)
}

const handleSubmit = async(event) => {
  event.preventDefault()

  
  try{
    const response = await signInAuthUserWithEmailAndPassword(email,password)
    console.log(response)
    resetFormFields()

  }catch(error){
    if(error.code === 'auth/wrong/password'){
      alert("Please provide valid Username & Password")
    }else{
      console.log("Error")
    }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an Account</h2>
      <span>Sign in with your Email & Password</span>
        <form onSubmit={ handleSubmit }>

          <FormInput label="Email" type = 'email' name = 'email' onChange={handleChange} value={email} required/>

          <FormInput label="Password" type = 'password' name = 'password' onChange={handleChange} value={password} required/>

          <div className='buttons-container'>
            <Button type="submit">Sign In</Button>
            <Button onClick={signInWithGoogle} buttonType = 'google'>Sign In With Google</Button>
          </div>
        </form>
      </div>
  )
}

export default SignInForm