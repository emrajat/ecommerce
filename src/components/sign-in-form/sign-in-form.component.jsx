import React,{useState} from 'react'
import { 
  signInWithGooglePopUp, 
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'


const defaultFormFields = {
  email:'',
  password: '',
}

const SignInForm = () => {

    const signInWithGoogle = async() => {
        await signInWithGooglePopUp();
        
  }



const [formFields,setFormFields] = useState(defaultFormFields)
const {email,password} = formFields

const handleChange = (event) => {
  const {name,value} = event.target
  setFormFields({...formFields,[name]:value})
}

const resetFormFields = () => {
  setFormFields(defaultFormFields)
}

const handleSubmit = async(event) => {
  event.preventDefault()

  
  try{
    const {user} = await signInAuthUserWithEmailAndPassword(email,password)
    resetFormFields()

  }catch(error){
    if(error.code === 'auth/wrong/password'){
      alert("Please provide valid Username & Password")
    }else{
      console.log(error)
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