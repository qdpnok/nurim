import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom"; // Link 대신 NavLink를 쓰면 활성화 스타일 적용 가능

const SidebarContainer = styled.div`
  width: 250px; /* 사이드바 너비 예시 */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;

  &:hover {
    background-color: #f5f5f5;
  }

  /* 현재 선택된 메뉴 스타일 */
  &.active {
    font-weight: bold;
    color: #2f5d62; /* 포인트 컬러 */
    background-color: #e0f2f1;
  }
`;

const SideBar = () => {
  return (
    <SidebarContainer>
      {/* 1. 마이페이지 홈 */}
      <MenuLink to="/mypage" end>
        {" "}
        마이페이지 홈
      </MenuLink>

      {/* 2. 구독 관리 (MyPage.js의 path="subscriptions"와 매칭) */}
      <MenuLink to="/mypage/subscriptions">구독 관리</MenuLink>

      {/* 3. 주문/배송 조회 (MyPage.js의 path="orders"와 매칭) */}
      <MenuLink to="/mypage/orders">구매 관리</MenuLink>

      {/* 5. 나의 리뷰 (MyPage.js의 path="reviews"와 매칭) */}
      <MenuLink to="/mypage/reviews">제품 관리</MenuLink>
    </SidebarContainer>
  );
};

export default SideBar;
