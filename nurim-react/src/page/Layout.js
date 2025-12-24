import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden; /* 가로 스크롤 방지 */
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1440px; /* 최대 너비 제한 */
  margin: 0 auto; /* 중앙 정렬 */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 모바일 헤더 높이에 맞춰 여백 줄임 */
  @media (max-width: 768px) {
    padding-top: 120px;
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
