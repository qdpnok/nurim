import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import HOME from "./page/Home";
import LogIn from "./page/Login";
import SignUp from "./page/SignUp";
import FindIP from "./page/FindPage";
import SubscribePage from "./page/SubscribePage";
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
            <Route path="/Subscriptions" element={<SubscribePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
