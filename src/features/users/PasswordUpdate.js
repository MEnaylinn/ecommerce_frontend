import React, { useEffect, useState } from 'react'
import classes from "./Signup.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { getStatus, getToken, getUser, getUserById, updatePassword } from '../auths/authSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PasswordUpdate = () => {
    const user = useSelector(getUser);
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const status = useSelector(getStatus);
    const from = location.state?.from?.pathname || "/";
  
    const [oldPassword, SetOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateStatus,setUpdateStatus]=useState('idle');

    const [check,setCheck] = useState(true)

    const canUpdate = [oldPassword,newPassword].every(Boolean) && updateStatus === "idle";
      

    useEffect(()=>{
      if(status === 'failed'){
        setCheck(false);
        setUpdateStatus('idle')
        console.log("updated status is "+status)
      }
    },[status])
  
    const onOldPasswordChange = (e) => SetOldPassword(e.target.value);
    const onNewPasswordChange = (e) => setNewPassword(e.target.value);

  
  
    const onUpdate = (e) => {
        console.log(canUpdate)
      e.preventDefault();
      if (canUpdate) {
        setUpdateStatus("pending");
        setCheck(true)
        dispatch(
          updatePassword({
           updatePasswordRequest : {
            oldPassword,
            newPassword
           },
            token: String(token),
          })
        )
      }
    };

    console.log("status code "+ status)
  return (
    <div className="grid gap-2 px-2 py-2">
    <div className='card row col-sm-12 col-md-6 m-auto mt-5'>
    <form className={classes.form}>
        <div className={classes.control}>
            <label htmlFor='oldPassword'>Current Password</label>
            <input 
                type='password' 
                id='oldPassword' 
                required
                onChange={onOldPasswordChange}
                value={oldPassword}
                
                className='form-control'
            />
        </div>

        <div className={classes.control}>
            <label htmlFor='newPassword'>New Password</label>
            <input 
                type='password' 
                id='newPassword' 
                required
                onChange={onNewPasswordChange}
                value={newPassword}
                
                className='form-control'
            />
        </div>
        <div className='text-center text-danger fw-bold' hidden={check}><p>Incorrect password.</p></div>

        <div className='text-end'><Link className='btn btn-primary' onClick={onUpdate}>Update</Link></div>
    </form>
    </div>
    </div>
  )
}

export default PasswordUpdate