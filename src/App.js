import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/ui/Layout";
import AllProducts from "./components/pages/AllProducts";
import NewProduct from "./components/pages/NewProduct";
import UpdateProductForm from "./features/products/UpdateProductForm";
import Signup from "./features/users/Signup";
import Signin from "./features/users/Signin";
import UnAuthorizeRoute from "./features/auths/UnAuthorizeRoute";
// import AdminDashboard from "./features/products/AdminDashboard";
import ProtectedRoute from "./features/auths/ProtectedRoute";
import ShoppingCard from "./features/cart/ShoppingCard.js";
import CardRegister from "./features/payment/CardRegister.js";
import Shipping from "./features/shipping/Shipping.js";
import Payment from "./features/payment/Payment.js";
import ShippingUpdate from "./features/shipping/ShippingUpdate.js";
import ShippingAdd from "./features/shipping/ShippingAdd.js";
import Profile from "./features/users/Profile.js";
import UserNameUpdate from "./features/users/UserNameUpdate.js";
import EmailPhoneUpdate from "./features/users/EmailUpdate.js";
import PasswordUpdate from "./features/users/PasswordUpdate.js";
import PhoneUpdate from "./features/users/PhoneUpdate.js";
import OrderHistory from "./features/order/OrderHistory.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route path="" element={<AllProducts />}>
          <Route path="categories/:category" element={<AllProducts />} />
        </Route>

        <Route path="user">
          <Route path="register" element={<Signup />} />
          <Route path="login" element={<Signin />} />
          <Route path="logout" element={<Navigate to={"/"} replace={true} />} />
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
          <Route path="" element={<Shipping />} />
          <Route path="create" element={<ShippingAdd />} />
          <Route path="all" element={<ShippingAdd />} />
          <Route path="update/:shippingId" element={<ShippingUpdate />} />
        </Route>

        <Route
          path="payment"
          element={<ProtectedRoute allowRoles={["ROLE_USER", "ROLE_ADMIN"]} />}
        >
          <Route path="" element={<Payment />} />
          <Route path="create" element={<CardRegister />} />
        </Route>

        <Route
          path="user"
          element={<ProtectedRoute allowRoles={["ROLE_USER", "ROLE_ADMIN"]} />}
        >
          <Route path="profile" element={<Profile />} />
          <Route path="username" element={<UserNameUpdate />} />
          <Route path="phone" element={<PhoneUpdate />} />
          <Route path="email" element={<EmailPhoneUpdate />} />
          <Route path="password" element={<PasswordUpdate />} />
        </Route>

        {/* Role_USER */}
        <Route
          path="unauthorized"
          element={<ProtectedRoute allowRoles={["ROLE_USER"]} />}
        >
          <Route index element={<UnAuthorizeRoute />} />
        </Route>

        <Route
          path="orders"
          element={<ProtectedRoute allowRoles={["ROLE_USER"]} />}
        >
          <Route index element={<OrderHistory />} />
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
          {/* <Route index element={<AdminDashboard />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
