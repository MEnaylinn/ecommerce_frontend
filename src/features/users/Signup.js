import React, { useState } from 'react'
import classes from './Signup.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../auths/authSlice'

const Signup = () => {
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [userName,setUserName]=useState('')
    const [fullName,setFullName]=useState('')
    const [password,setPassword]=useState('')
    const [signupRequestStatus,setSignupRequestStatus]=useState('idle')

    const onFirstNameChange=e => setFirstName(e.target.value)
    const onLastNameChange=e => setLastName(e.target.value)
    const onFullNameChange=e => setFullName(e.target.value)
    const onUserNameChange=e => setUserName(e.target.value)
    const onPasswordChange=e => setPassword(e.target.value)

    const canCreate = [firstName,lastName,fullName,userName,password].every(Boolean) && signupRequestStatus === 'idle'
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'


    const onSubmit = e =>{
        e.preventDefault()

        if(canCreate){
            setSignupRequestStatus('pending')
            dispatch(signup({
                firstname : firstName,
                lastname : lastName,
                fullname : fullName,
                username : userName,
                password
            }))

            navigate(from,{replace : true})
        }
    }
  return (
   <section>
    <div className='card row col-sm-12 col-md-6 m-auto mt-5'>
    <p className='fw-bold fs-4'>Sign Up For New User</p>
    
    <form className={classes.form}>
        <div className={classes.control}>
            <label htmlFor='firstName'>First Name</label>
            <input 
                type='text' 
                id='firstName' 
                required
                value={firstName}
                onChange={onFirstNameChange}
                className='form-control'
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='lastName'>Last Name</label>
            <input 
                type='text' 
                id='lastName' 
                required
                value={lastName}
                onChange={onLastNameChange}
                className='form-control'
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='fullName'>Full Name</label>
            <input 
                type='text' 
                id='fullName' 
                required
                value={fullName}
                onChange={onFullNameChange}
                className='form-control'
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='userName'>Email</label>
            <input 
                type='email' 
                id='userName' 
                required
                value={userName}
                onChange={onUserNameChange}
                className='form-control'
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input 
                type='password' 
                id='password' 
                required
                value={password}
                onChange={onPasswordChange}
                className='form-control'
            />
        </div>
        <div className={classes.actions}>
            <button onClick={onSubmit} disabled = {!canCreate}>Create</button>
        </div>
    </form>
    <Link className='fs-6' to={'/user/login'}>Already have an account.Login here.</Link>
    </div>
    

   </section>
  )
}

export default Signup