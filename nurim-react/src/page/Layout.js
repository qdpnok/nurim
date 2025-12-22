import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useAuth } from "./components/AuthContext";

import HeaderBasic from "./components/HeaderBasic";
import HeaderLogin from "./components/HeaderLogin";
import Footer from "./components/Footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 155px;
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
