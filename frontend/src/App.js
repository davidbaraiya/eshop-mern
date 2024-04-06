import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userAction } from "./redux/actions/userAction";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userAction());
  }, [dispatch]);

  // useEffect(() => {
  //   setUser(loggedInUser);
  // }, []);

  console.log(user);
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/search" element={<SearchPage />} />

          {/* auth */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />

          {/* not found page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
