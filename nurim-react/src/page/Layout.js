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
  const { isLoggedIn } = useAuth();

  return (
    <Wrapper>
      {isLoggedIn ? <HeaderLogin /> : <HeaderBasic />}
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
