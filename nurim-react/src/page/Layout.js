import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import HeaderBasic from "./HeaderBasic";
import HeaderLogin from "./HeaderLogin";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Main = styled.main`
  width: 1440px;

  /* 헤더 높이(180px)만큼 윗공간 확보 */
  padding-top: 180px;

  /* 푸터 높이(568px)를 뺀 나머지를 최소 높이로 잡음 */
  min-height: calc(100vh - 568px);

  /* ★핵심: 패딩을 높이 계산에 포함시켜서 스크롤 방지 */
  box-sizing: border-box;
`;

const Layout = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsLogin(true);
    else setIsLogin(false);
  }, []);

  return (
    <Container>
      {isLogin ? <HeaderLogin /> : <HeaderBasic />}

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </Container>
  );
};

export default Layout;
