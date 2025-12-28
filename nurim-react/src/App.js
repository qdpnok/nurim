import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import HOME from "./page/Home";
import LogIn from "./page/Login";
import SignUp from "./page/SignUp";
import FindIP from "./page/FindPage";
import SubPage from "./page/SubPage";
import ProductDetailPage from "./page/ProductDetailPage";
import CustomerSupportPage from "./page/CoustomerSuppoertPage";
import CartPage from "./page/CartPage";
import { CartProvider } from "./context/CartContext";
import MyPage from "./page/MyPage";
import CheckoutPage from "./page/CheckoutPage";

import "./App.css";

import ScrollToTop from "./ScrollToTop";
import { GlobalStyle } from "./styles/AuthStyles";

function App() {
  return (
    <>
      <CartProvider>
        <GlobalStyle />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HOME />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/findip" element={<FindIP />} />
              <Route
                path="/subscriptions"
                element={<SubPage type="subscription" />}
              />
              <Route path="/purchase" element={<SubPage type="purchase" />} />

              <Route
                path="/subscriptions/:category/:id"
                element={<ProductDetailPage />}
              />
              <Route
                path="/purchase/:category/:id"
                element={<ProductDetailPage />}
              />
              <Route path="/support" element={<CustomerSupportPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
