import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

import HeaderBasic from "./HeaderBasic"; // 파일 경로가 다르면 수정 필요
import HeaderLogin from "./HeaderLogin"; // 파일 경로가 다르면 수정 필요
import Footer from "./Footer";

// --- Styled Components ---

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Main = styled.main`
  flex: 1; /* 남은 공간을 차지하여 푸터를 바닥으로 밀어냄 */
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 중요: Header 컴포넌트들이 'position: fixed'로 설정되어 있어
     본문 내용이 헤더 뒤로 숨지 않도록 헤더 높이만큼 윗 공간을 띄워줍니다.
     Header(약 78px) + Navbar(약 76px) ≈ 154px 이므로 여유있게 잡습니다.
  */
  padding-top: 160px;
`;

// --- Component ---

const Layout = () => {
  const { isLoggedIn } = useAuth(); // Context에서 상태 가져오기

  return (
    <Wrapper>
      {/* 2. 로그인 상태에 따라 다른 헤더 표시 */}
      {isLoggedIn ? <HeaderLogin /> : <HeaderBasic />}

      {/* 3. 페이지별 내용이 들어갈 자리 */}
      <Main>
        <Outlet />
      </Main>

      {/* 4. 만들어둔 Footer 컴포넌트 사용 */}
      <Footer />
    </Wrapper>
  );
};

export default Layout;
