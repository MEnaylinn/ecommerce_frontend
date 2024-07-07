import { Outlet } from "react-router-dom"
import MainNavigation from "../layout/MainNavigation"
import classes from './Layout.module.css'


function Layout(props){
    return(
       <main>
        <MainNavigation/>
        <div className={classes.main}>
                <Outlet/>
        </div>
       </main>
    )
}
export default Layout