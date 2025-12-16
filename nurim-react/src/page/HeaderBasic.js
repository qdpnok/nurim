import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../img/search.png";
import { Link } from "react-router-dom";
import MainLogo from "../img/MainLogo.png";

// --- Styled Components ---

const Container = styled.div`
  width: 100%; /* 화면 꽉 차게 설정 */
  position: fixed; /* 상단 고정 */
  top: 0;
  left: 0; /* 왼쪽 끝부터 시작 */
  z-index: 1000;

  display: flex; /* Flexbox 사용 */
  flex-direction: column;
  align-items: center; /* 내부 요소(헤더, 네비바) 중앙 정렬 */

  background-color: white; /* 투명하지 않게 배경색 지정 */
`;

const HeaderWrapper = styled.header`
  background-color: #ffffff;
  height: 78px;
  position: relative;
  width: 1440px;
  border-bottom: 1px solid gray;
`;

// 검색창 관련
const SearchBackground = styled.div`
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
  gap: 122.4px;
  height: 20px;
  left: 115px;
  position: absolute;
  top: 29px;
  width: 273px;
  align-items: center;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  color: black;
  width: 100%;
  outline: none;
`;

const SearchImg = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

// 버튼 관련
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

// 공통 링크 스타일 (로그인/회원가입 내부 텍스트용)
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

// 로고
const Logo = styled.img`
  position: absolute;
  width: 130px;
  height: 24px;
  top: 25px;
  left: 670px; /* 로고는 헤더 중앙 쯤에 위치 유지 */
`;

// --- 네비게이션 바 (Flexbox 적용) ---
const Navbar = styled.div`
  background-color: #ffffff;
  height: 76px;
  width: 1440px;
  position: relative;
  display: flex; /* Flexbox 적용 */
  align-items: center;
  justify-content: center; /* 가운데 정렬 */
  gap: 60px; /* 메뉴 사이 간격 */
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const LineSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  top: 0;
`;

// 네비게이션 아이템 공통 스타일 (Link 컴포넌트 확장)
// $bold props가 있으면 굵게 표시
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

// --- Component ---

export const HeaderBasic = () => {
  const [search, setSearch] = useState("");

  return (
    <Container>
      <HeaderWrapper>
        <SearchBackground />
        <SearchGroup>
          <StyledInput
            type="text"
            placeholder="Search Product Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchImg src={SearchIcon} alt="검색" />
        </SearchGroup>

        <LoginFrame>
          <StyledLink to="/login" style={{ color: "#ffffff" }}>
            Log In
          </StyledLink>
        </LoginFrame>

        {/* 로고 클릭 시 홈으로 이동 */}
        <Link to="/">
          <Logo src={MainLogo} alt="Main Logo" />
        </Link>

        <SignupFrame>
          <StyledLink to="/signup" style={{ color: "#1e1e1e" }}>
            Sign Up
          </StyledLink>
        </SignupFrame>
      </HeaderWrapper>

      {/* 네비게이션 바 */}
      <Navbar>
        <LineSeparator />

        {/* 순서대로 배치 (absolute 좌표 순서 참고: Home -> List1 -> List2 -> QA -> List3 -> Contact) */}
        <NavItem to="/" $bold>
          Home
        </NavItem>
        <NavItem to="/list1">List 1</NavItem>
        <NavItem to="/list2">List 2</NavItem>
        <NavItem to="/qa">Q/A</NavItem>
        <NavItem to="/list3">List 3</NavItem>
        <NavItem to="/contact">Contact Us</NavItem>
      </Navbar>
    </Container>
  );
};

export default HeaderBasic;
