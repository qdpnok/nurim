import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MainLogo from "../../../img/MainLogo.png";
import SearchIcon from "../../../img/search.png";
import mypage from "../../../img/mypageicon.png";
import heart from "../../../img/hearticon.png";
import bell from "../../../img/bellicon.png";
import cart from "../../../img/carticon.png";

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const HeaderWrapper = styled.header`
  background-color: #ffffff;
  height: 78px;
  position: relative;
  width: 1440px;
  border-bottom: 1px solid gray;
`;

// --- 검색창 스타일 ---
const SearchBarBg = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  height: 37px;
  left: 100px;
  opacity: 0.05;
  position: absolute;
  top: 20px;
  width: 295px;
`;

const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  left: 115px;
  position: absolute;
  top: 29px;
  width: 270px;
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px;
  color: black;
  outline: none;

  &::placeholder {
    color: #1e1e1e;
    opacity: 0.3;
  }
`;

// --- 아이콘 및 뱃지 공통 스타일 ---
const IconWrapperBase = styled.div`
  position: absolute;
  top: 29px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BadgeBase = styled.div`
  border: 1px solid #ffffff;
  border-radius: 5px;
  height: 10px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 8px;
  font-weight: 400;
  padding: 0 2px;
  min-width: 10px;
`;

const MypageWrapper = styled(IconWrapperBase)`
  left: 1022px;
  top: 25px;
`;

const MessageWrapper = styled(IconWrapperBase)`
  left: 1079px;
  top: 25px;
`;

const MessageBadge = styled(BadgeBase)`
  background-color: #00a3ff;
`;

// 2. 알림 벨 아이콘 (왼쪽 1136px)
const BellWrapper = styled(IconWrapperBase)`
  left: 1136px;
  top: 25px;
`;

const BellBadge = styled(BadgeBase)`
  background-color: #ff0000;
`;

// 3. 장바구니/사람 아이콘 (왼쪽 1198px)
const CartWrapper = styled(IconWrapperBase)`
  left: 1193px;
  top: 25px;
`;

const CartBadge = styled(BadgeBase)`
  background-color: #00cc82;
`;

// --- 로그아웃 버튼 스타일 (HeaderBasic의 LoginFrame과 동일하게 수정) ---
const LogoutButton = styled.button`
  /* 위치 및 크기 설정 (LoginFrame 참조) */
  position: absolute;
  left: calc(50% + 550px); /* LoginFrame과 동일한 위치 계산 */
  top: calc(50% - 16px); /* LoginFrame과 동일한 위치 계산 */

  display: inline-flex;
  align-items: center; /* 텍스트 세로 중앙 정렬 */
  justify-content: center;

  padding: 8px 16px; /* LoginFrame과 동일한 패딩 */
  border-radius: 28px; /* LoginFrame과 동일한 둥근 모서리 */

  /* 색상 설정 */
  background-color: #2f6364; /* LoginFrame과 동일한 배경색 */
  border: 1px solid #ffffff; /* LoginFrame과 동일한 테두리 */
  color: #ffffff; /* 텍스트 색상 흰색 */

  /* 폰트 설정 */
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px; /* 기본 폰트 사이즈 */
  cursor: pointer;
  white-space: nowrap; /* 줄바꿈 방지 */

  /* 호버 효과 (선택사항) */
  &:hover {
    opacity: 0.9;
  }
`;

// --- 네비게이션 바 ---
const Navbar = styled.div`
  background-color: #ffffff;
  height: 76px;
  position: relative;
  width: 1440px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const NavItem = styled.div`
  color: #1e1e1e;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  opacity: ${(props) => (props.bold ? "1" : "0.5")};
  cursor: pointer;
  position: relative;

  &:hover {
    opacity: 1;
    font-weight: 700;
  }
`;

const LineSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
`;

const Logo = styled.img`
  position: absolute;
  width: 130px;
  height: 24px;
  top: 25px;
  left: 670px;
`;

const SearchImg = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

// --- React Component ---

export const HeaderLogin = () => {
  const [search, setSearch] = useState("");

  // 로그아웃 핸들러
  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <Container>
      <HeaderWrapper>
        {/* 검색창 */}
        <SearchBarBg />
        <SearchGroup>
          <SearchInput
            type="text"
            placeholder="Search Product Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchImg src={SearchIcon} alt="검색" />
        </SearchGroup>

        <Link to="/">
          <Logo src={MainLogo} alt="Logo" />
        </Link>

        {/* 1. 마이페이지 */}
        <MypageWrapper>
          <img src={mypage} alt="mypage" style={{ width: "30px" }} />
        </MypageWrapper>

        {/* 2. 위시리스트 아이콘 */}
        <MessageWrapper>
          <img src={heart} alt="msg" style={{ width: "20px" }} />
          <BellBadge>0</BellBadge>
        </MessageWrapper>

        {/* 3. 알림 아이콘 */}
        <BellWrapper>
          <img src={bell} alt="bell" style={{ width: "20px" }} />
          <MessageBadge>0</MessageBadge>
        </BellWrapper>

        {/* 4. 장바구니 아이콘 */}
        <CartWrapper>
          <img src={cart} alt="cart" style={{ width: "20px" }} />
          <CartBadge>0</CartBadge>
        </CartWrapper>

        {/* 로그아웃 버튼 (LoginFrame 스타일 적용됨) */}
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </HeaderWrapper>

      {/* 네비게이션 바 */}
      <Navbar>
        <LineSeparator />
        <NavItem bold>Home</NavItem>
        <NavItem>List 1</NavItem>
        <NavItem>List 2</NavItem>
        <NavItem>Q/A</NavItem>
        <NavItem>List 3</NavItem>
        <NavItem>Contact Us</NavItem>
      </Navbar>
    </Container>
  );
};

export default HeaderLogin;
