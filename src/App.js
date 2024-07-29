import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/Layout";
import AllProducts from "./components/pages/AllProducts";
import NewProduct from "./components/pages/NewProduct";
import UpdateProductForm from "./features/products/UpdateProductForm";
import Signup from "./features/users/Signup";
import Signin from "./features/users/Signin";
import UnAuthorizeRoute from "./features/auths/UnAuthorizeRoute";
import AdminDashboard from "./features/products/AdminDashboard";
import ProtectedRoute from "./features/auths/ProtectedRoute";
import Userprofile from "./features/products/Userprofile";

import AddShippingAddress from "./features/shipping/AddShippingAddress";
import UpdateShippingAddress from "./features/shipping/UpdateShippingAddress.js";
import ShoppingCard from "./features/cart/ShoppingCard.js";
import Payment from "./features/billing/Payment.js";
import CardRegister from "./features/billing/CardRegister.js";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route index element={<AllProducts />} />
        <Route path="user">
          <Route path="register" element={<Signup />} />
          <Route path="login" element={<Signin />} />
          <Route path="logout" element={<Signin />} />
          <Route path="profile" element={<Userprofile />} />
          {/* <Route path="logout" element={<Navigate to={'/'} replace={true}/>}/> */}
        </Route>

        {/* Role_USER, ROLE_ADMIN  */}
        <Route
          path="shopping-cart"
          element={<ProtectedRoute allowRoles={["ROLE_USER", "ROLE_ADMIN"]} />}
        >
          <Route index element={<ShoppingCard />} />
        </Route>

        <Route
          path="shipping"
          element={<ProtectedRoute allowRoles={["ROLE_USER", "ROLE_ADMIN"]} />}
        >
          <Route path="/" element={ <Shipping/>} />
          <Route path="create" element={<AddShippingAddress />} />
          <Route path="all" element={<AddShippingAddress />} />
          <Route
            path="update/:shippingId"
            element={<UpdateShippingAddress />}
          />
        </Route>

        <Route
            path="payment"
            element={
              <ProtectedRoute allowRoles={["ROLE_USER", "ROLE_ADMIN"]} />
            }
          >
            <Route path="info" element={<Payment />} />
            <Route path="create" element={<CardRegister />} />
            </Route>

        {/* Role_USER */}
        <Route
          path="unauthorized"
          element={<ProtectedRoute allowRoles={["ROLE_USER"]} />}
        >
          <Route index element={<UnAuthorizeRoute />} />
        </Route>

        {/* Role_ADMIN */}
        <Route
          path="product"
          element={<ProtectedRoute allowRoles={["ROLE_ADMIN"]} />}
        >
          <Route path="new" element={<NewProduct />} />
          <Route path="update/:productId" element={<UpdateProductForm />} />
        </Route>

        <Route
          path="dashboard"
          element={<ProtectedRoute allowRoles={["ROLE_ADMIN"]} />}
        >
          <Route index element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
