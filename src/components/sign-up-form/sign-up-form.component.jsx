import React,{useState} from 'react'
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

const defaultFormFields = {
  displayName: '',
  email:'',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {

const [formFields,setFormFields] = useState(defaultFormFields)
const {displayName,email,password,confirmPassword} = formFields

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

  if(password !== confirmPassword){
    alert("Password don't match")
    return
  }

  try{
    const {user} = await(createAuthUserWithEmailAndPassword(email,password))
    // setCurrentUser(user)
    await createUserDocumentFromAuth(user,{displayName})
    resetFormFields()

  }catch(error){
    if(error.code === 'auth/email-already-in-use'){
      alert('Cannot create user, already in use')
    }else{
    console.log(`user creation encountered an error`,error)
    }
  }

}


  return (
    <div className='sign-up-container'>
      <h2>Don't have an account</h2>
      <span>Sign Up with your Email & Password</span>
        <form onSubmit={ handleSubmit }>
          <FormInput label="Display Name" type= 'text' name = 'displayName' onChange={handleChange} value={displayName} required/>

          <FormInput label="Email" type = 'email' name = 'email' onChange={handleChange} value={email} required/>

          <FormInput label="Password" type = 'password' name = 'password' onChange={handleChange} value={password} required/>

          <FormInput label="Confirm Password" type = 'password' name = 'confirmPassword' onChange={handleChange} value={confirmPassword} required/>

          <Button type="submit">Sign Up</Button>
        </form>
      </div>
  )
}

export default SignUpForm