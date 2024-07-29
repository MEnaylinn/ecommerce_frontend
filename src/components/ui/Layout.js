import { Outlet } from "react-router-dom";
import MainNavigation from "../layouts/MainNavigation";

function Layout(props) {
  return (
    <main>
      <MainNavigation />
      <div>
        <Outlet />
      </div>
    </main>
  );
}
export default Layout;
