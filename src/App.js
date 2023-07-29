// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderCategory from "./components/HeaderCategory";
import ProductOrderSummary from "./pages/ProductOrderSummary";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SignUPPage from "./pages/SignUPPage";
import LoginPage from "./pages/LoginPage";
// import { WishlistProvider } from "./Redux/reducers/WishlistContext";
// import { CartProvider } from "./Redux/reducers/CartContext"; // Import the CartProvider
import ProductsFiltered from "./components/ProductsFiltered";
import Wishlist from "./pages/WishList";
// import { ProductProvider } from "./reducers/ProductContext";

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/products/:id" element={<ProductOrderSummary />} />
        <Route path="/products/category/:category" element={<ProductsFiltered />} />
        <Route path="/products/categories" element={<HeaderCategory />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUPPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

    </Router>
  );
};

export default App;
