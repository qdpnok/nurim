import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import HOME from "./page/Home";
import LogIn from "./page/Login";
import SignUp from "./page/SignUp";
import FindIP from "./page/FindPage";
import SubPage from "./page/SubPage";
import ProductDetailPage from "./page/ProductDetailPage";
import "./App.css";
import { AuthProvider } from "./page/components/Auth/AuthContext";
import ScrollToTop from "./ScrollToTop";

// [수정 1] 경로 수정: ../styles -> ./styles
import { GlobalStyle } from "./styles/AuthStyles";

function App() {
  return (
    <AuthProvider>
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
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
