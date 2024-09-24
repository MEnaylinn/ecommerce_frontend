import { Outlet } from "react-router-dom";
import MainNavigation from "../layouts/MainNavigation";
import Footer from "../layouts/Footer";

function Layout(props) {
  return (
    <main>
      <MainNavigation />
      <div className="outlet-content">
        <Outlet  />
      </div>
      <Footer/>
    </main>
  );
}
export default Layout;
