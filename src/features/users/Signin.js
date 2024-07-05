import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import classes from './Sigin.module.css'
import { useDispatch } from 'react-redux'
import { signin } from '../auths/authSlice'

const Signin = () => {
    const [userName,setUserName] =useState('')
    const [password,setPassword] = useState('')
    const [loginStatus,setLoginStatus] =useState('idle')
    const dispatch = useDispatch()
    const location = useLocation()

    const from = location.state?.from.pathname || '/'

    const onUserNameChange = (e) => setUserName(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)

    const canLogin = [userName,password].every(Boolean) && loginStatus === 'idle'
    const navigate = useNavigate()

    const onSubmit = (e) =>{
        e.preventDefault()

        if(canLogin){
            setLoginStatus('pending')
            dispatch(signin({
                username:userName,
                password
            }))

            navigate(from,{replace : true })
        }
    }
    
  return (
<section>
    <h1>Sign Up For New User</h1>
    <Card>
    <form className={classes.form}>
        <div className={classes.control}>
            <label htmlFor='userName'>Email</label>
            <input 
                type='email' 
                id='userName' 
                required
                value={userName}
                onChange={onUserNameChange}
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
            />
        </div>
        
        <div className={classes.actions}>
            <button onClick={onSubmit} disabled = {!canLogin}>Login</button>
        </div>
    </form>
    <Link to={'/user/register'}>No have an account? Register here.</Link>
    </Card>
   </section>  )
}

export default Signin