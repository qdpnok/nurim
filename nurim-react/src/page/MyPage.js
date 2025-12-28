import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/MyPage/Sidebar";

// [수정] 컨텐츠 컴포넌트 경로 수정
import MyPageHome from "./components/MyPage/Contents/MyPageHome";
import SubscriptionManage from "./components/MyPage/Contents/SubscriptionManage";
import OrderManage from "./components/MyPage/Contents/OrderManage";
import ShoppingManage from "./components/MyPage/Contents/ShoppingManage";
import ReviewManage from "./components/MyPage/Contents/ReviewManage";

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
      {/* 1. 왼쪽 고정 사이드바 */}
      <Sidebar />

      {/* 2. 우측 변경되는 컨텐츠 영역 */}
      <Routes>
        {/* 마이페이지 홈 (기본) */}
        <Route path="/" element={<MyPageHome />} />

        {/* 각 메뉴별 상세 페이지 */}
        <Route path="subscriptions" element={<SubscriptionManage />} />
        <Route path="orders" element={<OrderManage />} />
        <Route path="shopping" element={<ShoppingManage />} />
        <Route path="reviews" element={<ReviewManage />} />
      </Routes>
    </PageContainer>
  );
};

export default MyPage;
