import { Link } from "react-router-dom"
import classes from "./MainNavigation.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getLoginStatus, getUser, logout } from "../../features/auths/authSlice"

function MainNavigation(){

    const loginStatus = useSelector(getLoginStatus)
    const user = useSelector(getUser)
    const dispatch = useDispatch()


    let navProfile = "";
    let navLogin = "";
    
        if(loginStatus){
            navProfile = (<li><Link to='/user/profile'>{user.username}</Link></li>);
            navLogin = <Link to='/user/logout' onClick={dispatch(logout)}>Logout</Link>;
        }else{
            navLogin = <Link to='/user/login'>Login</Link>;
        }

    return(
        //sematic element
        <header className={classes.header}>
            <div className={classes.logo}>
                Fake Shop
            </div>

            <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/product/new'>New Product</Link></li>
            {navProfile}
            <li><Link to="/shopping-cart">Cart</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>{navLogin}</li>


            </ul>

        </header>
    )
}
export default MainNavigation 