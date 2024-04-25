import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userAction } from "./redux/actions/userAction";
import Cookie from "js-cookie";
// components
import { Header, Footer } from "./components";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import SearchPage from "./pages/SearchPage";
import MyProfile from "./pages/MyProfile";
import ChangePassword from "./pages/ChangePassword";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import Shipping from "./pages/Shipping";
import ConfirmOrder from "./pages/ConfirmOrder";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import axios from "axios";
import MyOrder from "./pages/MyOrder";
import OrderDetails from "./pages/OrderDetails";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/AdminProducts";
import CreateProduct from "./admin/CreateProduct";
import EditProduct from "./admin/EditProduct";
import OrderList from "./admin/OrdersList";
import EditOrder from "./admin/EditOrder";
import UsersList from "./admin/UsersList";
import EditUser from "./admin/EditUser";
import ReviewsList from "./admin/ReviewsList";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const token = Cookie.get("auth-token");

  useEffect(() => {
    if (token) {
      dispatch(userAction());
      const getStripeApiKey = async () => {
        try {
          const { data } = await axios.get("/api/v1/stripeapikey");
          setStripeApiKey(data.stripeApiKey);
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      };
      getStripeApiKey();
    }
  }, [dispatch, token]);

  if (user.loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* products */}
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/products" element={<ProductList />} />
          <Route path="/search" element={<SearchPage />} />

          {/* auth */}
          <Route path="/auth/login" element={<Login user={user} />} />
          <Route path="/auth/register" element={<Register user={user} />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPassword user={user} />}
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword user={user} />
              </ProtectedRoute>
            }
          />

          {/* cart  */}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />

          {/* payment  */}
          {stripeApiKey && (
            <>
              <Route
                path="/payment/process"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
              <Route path="/payment/success" element={<PaymentSuccess />} />
            </>
          )}

          {/* my orders */}
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-order/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          {/* admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/create"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/edit/:productId"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/edit/:orderId"
            element={
              <ProtectedRoute>
                <EditOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/edit/:userId"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute>
                <ReviewsList />
              </ProtectedRoute>
            }
          />

          {/* not found page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
