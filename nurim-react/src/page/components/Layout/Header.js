import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

// 이미지 import (경로 확인 필요)
import MainLogo from "../../../img/MainLogo.png";
import SearchIcon from "../../../img/search.png";
import mypage from "../../../img/mypageicon.png";
import bell from "../../../img/bellicon.png";
import cart from "../../../img/carticon.png";

const Container = styled.div`
  width: 100%;
  position: sticky; /* fixed 대신 sticky 사용 고려 (상황에 따라) */
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); /* 약간의 그림자 추가 */
`;

const HeaderWrapper = styled.header`
  background-color: #ffffff;
  width: 100%;
  max-width: 1440px; /* 최대 너비 제한 */
  height: 80px; /* 높이 약간 조정 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양 끝 정렬 */
  padding: 0 20px; /* 좌우 여백 추가 */
  box-sizing: border-box;

  /* 모바일 대응 */
  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    padding: 15px 20px;
    gap: 15px;
  }
`;

// --- 검색창 스타일 ---
const SearchBarBg = styled.div`
  /* 배경용 div 제거하고 SearchGroup에 스타일 통합 */
  display: none;
`;

const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px; /* 기본 너비 */
  height: 40px;
  background-color: rgba(30, 30, 30, 0.05);
  border-radius: 8px;
  padding: 0 15px;
  box-sizing: border-box;

  /* 모바일 대응 */
  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 꽉 차게 */
    order: 2; /* 로고 아래로 내리기 */
  }
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

const SearchImg = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

// --- 로고 스타일 ---
const LogoLink = styled(Link)`
  /* PC에서는 중앙 정렬 */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  /* 모바일 대응 */
  @media (max-width: 768px) {
    position: static; /* relative 흐름 따르기 */
    transform: none;
    order: 1; /* 맨 위로 */
    margin-bottom: 5px;
  }
`;

const Logo = styled.img`
  width: 130px;
  height: 24px;
  object-fit: contain;
`;

// --- 우측 버튼 그룹 (로그인/아이콘) ---
const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  /* 모바일 대응 */
  @media (max-width: 768px) {
    order: 3; /* 검색창 아래로 */
    width: 100%;
    justify-content: flex-end; /* 오른쪽 정렬 */
  }
`;

// [비로그인용] 버튼 스타일
const AuthButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;

  /* 색상 분기 */
  background-color: ${(props) => (props.$primary ? "#2f6364" : "transparent")};
  color: ${(props) => (props.$primary ? "#ffffff" : "#1e1e1e")};
  border: ${(props) => (props.$primary ? "1px solid #2f6364" : "none")};

  &:hover {
    opacity: 0.8;
  }
`;

// [로그인용] 아이콘 스타일
const IconWrapper = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 22px;
    height: auto;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.color || "red"};
  color: white;
  font-size: 9px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 10px;
  border: 1px solid white;
`;

const LogoutButton = styled.button`
  padding: 6px 12px;
  border-radius: 20px;
  background-color: #2f6364;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  margin-left: 10px;

  &:hover {
    opacity: 0.9;
  }
`;

// --- 네비게이션 바 ---
const Navbar = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 1440px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px; /* 간격 조정 */
  border-top: 1px solid rgba(0, 0, 0, 0.1); /* 상단 선을 Navbar에 포함 */

  /* 모바일 대응 */
  @media (max-width: 768px) {
    height: auto;
    flex-wrap: wrap; /* 줄바꿈 허용 */
    padding: 10px 0;
    gap: 20px;
  }
`;

const NavItem = styled(Link)`
  color: #1e1e1e;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 15px;
  text-decoration: none;
  /* $bold가 true면 700, false면 400 */
  font-weight: ${(props) => (props.$bold ? "700" : "400")};
  /* $bold가 true면 불투명도 1, false면 0.6 */
  opacity: ${(props) => (props.$bold ? "1" : "0.6")};
  cursor: pointer;
  padding: 5px;

  &:hover {
    opacity: 1;
    font-weight: 700;
    color: #2f6364;
  }
`;

// --- [추가] 하단 구분선 ---
const BottomLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`;

// =================================================================
// [통합 Header 컴포넌트]
// =================================================================

const Header = () => {
  const [search, setSearch] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  // Context에서 cartItems 가져오기
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;
    localStorage.removeItem("accessToken");
    setIsLogin(false);
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };
  return (
    <Container>
      <HeaderWrapper>
        {/* 1. 검색창 */}
        <SearchGroup>
          <SearchInput
            type="text"
            placeholder="Search Product Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchImg src={SearchIcon} alt="검색" />
        </SearchGroup>

        {/* 2. 로고 */}
        <LogoLink to="/">
          <Logo src={MainLogo} alt="Main Logo" />
        </LogoLink>

        {/* 3. 우측 그룹 */}
        <RightGroup>
          {isLogin ? (
            <>
              <Link to="/mypage">
                <IconWrapper>
                  <img src={mypage} alt="mypage" />
                </IconWrapper>
              </Link>
              <IconWrapper>
                <img src={bell} alt="bell" />
                <Badge color="#00a3ff">0</Badge>
              </IconWrapper>
              <Link to="/cart">
                <IconWrapper>
                  <img src={cart} alt="cart" />
                  {/* 장바구니 개수 표시 */}
                  <Badge color="#00cc82">{cartItems.length}</Badge>
                </IconWrapper>
              </Link>

              <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
            </>
          ) : (
            <>
              <AuthButton to="/signup">Sign Up</AuthButton>
              <AuthButton to="/login" $primary>
                Log In
              </AuthButton>
            </>
          )}
        </RightGroup>
      </HeaderWrapper>

      {/* 4. 네비게이션 바: 현재 경로(location.pathname)와 비교하여 $bold 전달 */}
      <Navbar>
        <NavItem to="/" $bold={location.pathname === "/"}>
          Home
        </NavItem>
        <NavItem
          to="/subscriptions"
          $bold={location.pathname === "/subscriptions"}
        >
          Subscriptions
        </NavItem>
        <NavItem to="/purchase" $bold={location.pathname === "/purchase"}>
          Purchase
        </NavItem>
        <NavItem to="/QnA" $bold={location.pathname === "/QnA"}>
          QnA
        </NavItem>
      </Navbar>

      <BottomLine />
    </Container>
  );
};

export default Header;
