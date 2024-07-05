import { Outlet } from "react-router-dom"
import MainNavigation from "../layout/MainNavigation"
import classes from "./Layout.module.css"


function Layout(props){
    return(
       <div>
        <MainNavigation/>
        <main className={classes.main}>
            <Outlet/>
        </main>
       </div>
    )
}
export default Layout