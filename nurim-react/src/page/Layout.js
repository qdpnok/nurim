import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import HeaderBasic from "./HeaderBasic";
import HeaderLogin from "./HeaderLogin";

const Container = styled.div`
  width: 100vh;
  height: auto;
`;

const Main = styled.main`
  width: 1280px;
`;

const Layout = () => {
  return (
    <>
      <Container>
        <HeaderBasic />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
