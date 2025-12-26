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
import "./App.css";

import ScrollToTop from "./ScrollToTop";
import { GlobalStyle } from "./styles/AuthStyles";

function App() {
  return (
    <>
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
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
