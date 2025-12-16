import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Layout from "./page/Layout";
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import "./App.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 500px;
  background-color: gray;
`;

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
