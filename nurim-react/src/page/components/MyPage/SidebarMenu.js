import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const MenuTitle = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 15px;

  a {
    text-decoration: none;
    font-size: 14px;
    color: #555;
    transition: color 0.2s;
    display: block; /* 클릭 영역 확보 */

    &:hover,
    &.active {
      color: #000;
      font-weight: bold;
    }
  }
`;

const MENU_ITEMS = [
  { name: "구독 관리", path: "/mypage/subscriptions" },
  { name: "구매 관리", path: "/mypage/orders" },
  { name: "쇼핑 관리", path: "/mypage/shopping" },
  { name: "제품/리뷰", path: "/mypage/reviews" },
];

const SidebarMenu = () => {
  const location = useLocation();

  return (
    <>
      <MenuTitle>마이페이지 홈</MenuTitle>
      <MenuList>
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.path}>
            <Link
              to={item.path}
              // 현재 URL과 링크 주소가 같으면 'active' 클래스 적용
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.name}
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </>
  );
};

export default SidebarMenu;
