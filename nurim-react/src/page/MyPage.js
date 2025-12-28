import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/MyPage/SideBar";

// 컨텐츠 컴포넌트들
import MyPageHome from "./components/MyPage/Contents/MyPageHome";
import SubscriptionManage from "./components/MyPage/Contents/SubscriptionManage";
import OrderManage from "./components/MyPage/Contents/OrderManage";

import ReviewManage from "./components/MyPage/Contents/ReviewManage";
import MemberInfo from "./components/MyPage/Contents/MemberInfo";

const PageContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: flex;
  padding-top: 50px;
  padding-bottom: 100px;
  gap: 107px;
`;

const MyPage = () => {
  return (
    <PageContainer>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<MyPageHome />} />
          <Route path="info" element={<MemberInfo />} />
          <Route path="subscriptions" element={<SubscriptionManage />} />
          <Route path="orders" element={<OrderManage />} />
          <Route path="reviews" element={<ReviewManage />} />
        </Routes>
      </div>
    </PageContainer>
  );
};

export default MyPage;
