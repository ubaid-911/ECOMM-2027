import React from "react";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import SupportModal from "./pages/SupportModal";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter,
  Routes,
  useLocation,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Practice from "./pages/Practice";

const Layout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/auth";

  const profile = JSON.parse(localStorage.getItem("profile"));
  const isAuthenticated = !!profile?.token;

  return (
    <>
      {!hideLayout && isAuthenticated && <Navbar />}

      <Routes>
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />}
        />

        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/auth" replace />}
        />

        <Route
          path="/products"
          element={
            isAuthenticated ? <AllProducts /> : <Navigate to="/auth" replace />
          }
        />

        <Route
          path="/products/:id"
          element={
            isAuthenticated ? (
              <ProductDetails />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/auth" replace />}
        />

        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/auth" replace />
          }
        />

        <Route
          path="/orders"
          element={
            isAuthenticated ? <Orders /> : <Navigate to="/auth" replace />
          }
        />

        <Route
          path="/support"
          element={
            isAuthenticated ? <SupportModal /> : <Navigate to="/auth" replace />
          }


        />

          <Route path="/practice"  element={<Practice/>}/>

      </Routes>

      {!hideLayout && isAuthenticated && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  );
};

export default App;
