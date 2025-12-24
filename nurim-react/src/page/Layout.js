import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

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
