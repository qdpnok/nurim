import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom"; // useLocation 추가 (페이지 이동 감지용)

// 이미지 import (경로에 맞춰 수정 필요)
import MainLogo from "../../../img/MainLogo.png";
import SearchIcon from "../../../img/search.png";
import mypage from "../../../img/mypageicon.png";
import bell from "../../../img/bellicon.png";
import cart from "../../../img/carticon.png";

// =================================================================
// [스타일 컴포넌트 정의]
// =================================================================

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

const SearchImg = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

// --- 로고 스타일 ---
const Logo = styled.img`
  position: absolute;
  width: 130px;
  height: 24px;
  top: 25px;
  left: 670px;
`;

// --- [비로그인용] 버튼 스타일 ---
const LoginFrame = styled.div`
  align-items: flex-start;
  background-color: #2f6364;
  border: 1px solid #ffffff;
  border-radius: 28px;
  display: inline-flex;
  left: calc(50% + 550px);
  padding: 8px 16px;
  position: absolute;
  top: calc(50% - 16px);
  cursor: pointer;
`;

const SignupFrame = styled.div`
  align-items: flex-start;
  border-radius: 28px;
  display: inline-flex;
  left: calc(50% + 438px);
  padding: 8px 16px;
  position: absolute;
  top: calc(50% - 16px);
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

// --- [로그인용] 아이콘 및 버튼 스타일 ---
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
  left: 1079px;
  top: 25px;
`;

const BellWrapper = styled(IconWrapperBase)`
  left: 1136px;
  top: 25px;
`;

const MessageBadge = styled(BadgeBase)`
  background-color: #00a3ff;
`;

const CartWrapper = styled(IconWrapperBase)`
  left: 1193px;
  top: 25px;
`;

const CartBadge = styled(BadgeBase)`
  background-color: #00cc82;
`;

const LogoutButton = styled.button`
  position: absolute;
  left: calc(50% + 550px);
  top: calc(50% - 16px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 28px;
  background-color: #2f6364;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

// --- 네비게이션 바 ---
const Navbar = styled.div`
  background-color: #ffffff;
  height: 76px;
  width: 1440px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
`;

const LineSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
`;

const NavItem = styled(Link)`
  color: #1e1e1e;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px;
  text-decoration: none;
  font-weight: ${(props) => (props.$bold ? "700" : "400")};
  opacity: ${(props) => (props.$bold ? "1" : "0.5")};
  cursor: pointer;

  &:hover {
    opacity: 1;
    font-weight: 700;
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
  const location = useLocation(); // 페이지 이동 시 상태 체크를 위해

  // 컴포넌트 마운트 시 및 경로 변경 시 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token); // 토큰이 있으면 true, 없으면 false
  }, [location.pathname]);

  // 로그아웃 핸들러
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
        {/* 1. 공통: 검색창 */}
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

        {/* 2. 공통: 메인 로고 */}
        <Link to="/">
          <Logo src={MainLogo} alt="Main Logo" />
        </Link>

        {/* 3. 로그인 상태에 따른 분기 처리 */}
        {isLogin ? (
          // [로그인 상태일 때]
          <>
            <MypageWrapper>
              <img src={mypage} alt="mypage" style={{ width: "30px" }} />
            </MypageWrapper>

            <BellWrapper>
              <img src={bell} alt="bell" style={{ width: "20px" }} />
              <MessageBadge>0</MessageBadge>
            </BellWrapper>

            <CartWrapper>
              <img src={cart} alt="cart" style={{ width: "20px" }} />
              <CartBadge>0</CartBadge>
            </CartWrapper>

            <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
          </>
        ) : (
          // [비로그인 상태일 때]
          <>
            <SignupFrame>
              <StyledLink to="/signup" style={{ color: "#1e1e1e" }}>
                Sign Up
              </StyledLink>
            </SignupFrame>

            <LoginFrame>
              <StyledLink to="/login" style={{ color: "#ffffff" }}>
                Log In
              </StyledLink>
            </LoginFrame>
          </>
        )}
      </HeaderWrapper>

      {/* 4. 네비게이션 바 (공통) */}
      <Navbar>
        <LineSeparator />
        <NavItem to="/" $bold>
          Home
        </NavItem>
        <NavItem to="/product">All product</NavItem>
        <NavItem to="/subscriptions">Subscriptions</NavItem>
        <NavItem to="/purchase">Purchase</NavItem>
        <NavItem to="/QnA">QnA</NavItem>
      </Navbar>

      {/* 5. 하단 구분선 */}
      <BottomLine />
    </Container>
  );
};

export default Header;
