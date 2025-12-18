import React, { useState } from "react";
import styled from "styled-components";
// 사용할 아이콘 이미지들을 import 해주세요. (없으면 빈 박스로 나옵니다)
// import MessageIconImg from "../img/message.png";
// import BellIconImg from "../img/bell.png";
// import CartIconImg from "../img/cart.png";
// import ProfileImg from "../img/profile.png";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import MainLogo from "../img/MainLogo.png";
import SearchIcon from "../img/search.png";

const Container = styled.div`
  width: 100%;
  position: fixed; /* 상단 고정 */
  top: 0;
  left: 0; /* 왼쪽 끝부터 시작 */
  z-index: 1000;
  display: flex; /* Flexbox 사용 */
  flex-direction: column;
  align-items: center; /* 내부 요소 중앙 정렬 */
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
  right: 0; /* 아이콘 우측 상단 배치 */
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

// 1. 메시지 아이콘 (왼쪽 1079px)
const MessageWrapper = styled(IconWrapperBase)`
  left: 1079px;
`;
const MessageBadge = styled(BadgeBase)`
  background-color: #00a3ff; /* 파란색 */
`;

// 2. 알림 벨 아이콘 (왼쪽 1136px)
const BellWrapper = styled(IconWrapperBase)`
  left: 1136px;
`;
const BellBadge = styled(BadgeBase)`
  background-color: #ff0000; /* 빨간색 */
`;

// 3. 장바구니/사람 아이콘 (왼쪽 1198px)
const CartWrapper = styled(IconWrapperBase)`
  left: 1198px;
`;
const CartBadge = styled(BadgeBase)`
  background-color: #00cc82; /* 초록색 */
`;

// --- 로그아웃 버튼 스타일 추가 ---
const LogoutButton = styled.button`
  position: absolute;
  left: 1280px; /* 아이콘들 오른쪽 적절한 위치에 배치 */
  top: 25px;
  background: none;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 12px;
  color: #1e1e1e;
  transition: all 0.2s;

  &:hover {
    background-color: #1e1e1e;
    color: #ffffff;
    border-color: #1e1e1e;
  }
`;

// 4. 프로필 이미지 (왼쪽 1283px -> 로그아웃 버튼 때문에 위치 조정 필요 시 수정)
const ProfileWrapper = styled.div`
  height: 44px;
  width: 44px;
  left: 1360px; /* 로그아웃 버튼 옆으로 밀어둠 (예시) */
  position: absolute;
  top: 17px; /* 중앙 정렬을 위해 위치 조정 */
  border-radius: 22px;
  background-color: #d9d9d9; /* 이미지가 없을 때 회색 배경 */
  overflow: hidden;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// --- 네비게이션 바 (Flexbox 적용) ---
const Navbar = styled.div`
  background-color: #ffffff;
  height: 76px;
  position: relative;
  width: 1440px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px; /* 메뉴 사이 간격 */
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const NavItem = styled.div`
  color: #1e1e1e;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: ${(props) => (props.bold ? "700" : "400")}; /* Home만 굵게 */
  opacity: ${(props) => (props.bold ? "1" : "0.5")}; /* Home만 진하게 */
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
  const nav = useNavigate(); // 페이지 이동을 위한 훅

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 1. 사용자 확인 (선택 사항)
    if (!window.confirm("로그아웃 하시겠습니까?")) return;

    // 2. 토큰 및 사용자 정보 삭제 (저장 방식에 따라 키 이름 변경 필요)
    // 예: localStorage, sessionStorage, Cookies
    localStorage.removeItem("accessToken");

    // 3. 로그아웃 완료 알림 및 페이지 이동
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

        {/* 1. 메시지 아이콘 (파란 뱃지 '0') */}
        <MessageWrapper>
          {/* <img src={MessageIconImg} alt="msg" style={{width: '20px'}} /> */}
          <div
            style={{ width: "20px", height: "20px", background: "#ccc" }}
          ></div>
          <MessageBadge>0</MessageBadge>
        </MessageWrapper>

        {/* 2. 알림 아이콘 (빨간 뱃지 '99+') */}
        <BellWrapper>
          {/* <img src={BellIconImg} alt="bell" style={{width: '20px'}} /> */}
          <div
            style={{ width: "20px", height: "20px", background: "#ccc" }}
          ></div>
          {/* <BellBadge>99+</BellBadge> */}
        </BellWrapper>

        {/* 3. 장바구니 아이콘 (초록 뱃지 '6') */}
        <CartWrapper>
          {/* <img src={CartIconImg} alt="cart" style={{width: '20px'}} /> */}
          <div
            style={{ width: "20px", height: "20px", background: "#ccc" }}
          ></div>
          <CartBadge>6</CartBadge>
        </CartWrapper>

        {/* 로그아웃 버튼 */}
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

        {/* 프로필 이미지 (필요 시 주석 해제하여 사용) */}
        {/* <ProfileWrapper>
             <ProfileImage src={ProfileImg} alt="Profile" />
           </ProfileWrapper> 
        */}
      </HeaderWrapper>

      {/* 네비게이션 바 */}
      <Navbar>
        <LineSeparator />
        {/* 순서를 디자인에 맞게 배치 */}
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
