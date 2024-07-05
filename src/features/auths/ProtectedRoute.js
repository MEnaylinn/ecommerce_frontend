import React from 'react'
import { useSelector } from 'react-redux'
import { getLoginStatus, getRole } from './authSlice'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = ({allowRoles}) => {
    const isAuth = useSelector(getLoginStatus)
    const roles = [...useSelector (getRole)]
    const location =useLocation()

    
  return (
    
        isAuth ? 
          roles.find(role => allowRoles.includes(role))?
          <Outlet/>
          :<Navigate to='/unauthorized' state={{from : location}} replace={true}/>
        :<Navigate to='/user/login' state={{from : location}} replace={true}/>
    
)
}

export default ProtectedRoute