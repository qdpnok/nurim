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
import AdminLayout from "./page/AdminLayout";
import AdminDashboard from "./page/Admin/AdminDashboard";
import AdminFaq from "./page/Admin/AdminFaq";
import AdminQna from "./page/Admin/AdminQna";
import AdminConsultation from "./page/Admin/AdminConsultation";
import AdminMemberInfo from "./page/Admin/AdminMemberInfo";
import AdminWithdrawal from "./page/Admin/AdminWithdrawal";
import AdminProductList from "./page/Admin/AdminProductList";
import AdminProductRegister from "./page/Admin/AdminProductRegister";
import AdminOrderList from "./page/Admin/AdminOrderList";
import AdminSales from "./page/Admin/AdminSales";
import ProtectedRoute from "./page/components/Auth/ProtectedRoute";

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
              <Route path="/mypage/*" element={<MyPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            {/* ---------------- 관리자 페이지 (Admin) ---------------- */}
            <Route element={<ProtectedRoute allowedStatus="MANAGER" />}>
              <Route path="/admin" element={<AdminLayout />}>
                {/* 대시보드 (메인) */}
                <Route index element={<AdminDashboard />} />

                {/* 회원 관리 */}
                <Route path="members" element={<AdminMemberInfo />} />

                {/* 회원 탈퇴 관리 (추가!) */}
                <Route path="withdrawal" element={<AdminWithdrawal />} />

                {/* 문의 관리 - FAQ */}
                <Route path="faq" element={<AdminFaq />} />

                {/* 문의 관리 - QnA */}
                <Route path="qna" element={<AdminQna />} />

                {/* 문의 관리 - 상담 신청 내역 */}
                <Route path="consultation" element={<AdminConsultation />} />

                {/* 상품 관리 */}
                <Route path="products" element={<AdminProductList />} />
                <Route
                  path="products/register"
                  element={<AdminProductRegister />}
                />

                {/* 주문/매출 관리 */}
                <Route path="orders" element={<AdminOrderList />} />
                <Route path="sales" element={<AdminSales />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
