import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../img/search.png"; 
import { Link } from "react-router-dom";


const Container = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  margin-bottom: 180px;
  z-index: 1000; 
`;

const HeaderWrapper = styled.header`
  background-color: #ffffff;
  height: 78px;
  position: relative;
  width: 1440px;
  border-bottom: 1px solid gray;
`;

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

const LoginText = styled.div`
  color: #ffffff;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  text-align: center;
  width: fit-content;
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

const SignupText = styled.div`
  color: #1e1e1e;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  text-align: center;
  width: fit-content;
`;

const Navbar = styled.div`
  background-color: #ffffff;
  height: 76px;
  position: relative;
  width: 1440px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

const LineSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 20px;
`;

const NavTextBase = styled.div`
  color: #1e1e1e;
  font-family: "Outfit-Regular", Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 28px;
`;

const List1Text = styled(NavTextBase)`
  left: 520px;
  opacity: 0.5;
`;

const QAText = styled(NavTextBase)`
  left: 795px;
  opacity: 0.5;
`;

const List3Text = styled(NavTextBase)`
  left: 896px;
  opacity: 0.5;
`;

const ContactText = styled(NavTextBase)`
  left: 990px;
  opacity: 0.5;
`;

const HomeText = styled(NavTextBase)`
  font-family: "Outfit-Bold", Helvetica, sans-serif;
  font-weight: 700;
  left: 404px;
`;

const List2Group = styled.div`
  display: flex;
  height: 18px;
  left: 637px;
  position: absolute;
  top: 28px;
  width: 35px;
`;

const List2Text = styled(NavTextBase)`
  opacity: 0.5;
  width: 40px;
  position: static;
`;

export const HeaderBasic = () => {
  const [search, setSearch] = useState("");

  return (
    <Container>
      <HeaderWrapper>
        {/* 검색창 배경 */}
        <SearchBackground />

        {/* 검색창 그룹 (Input + Icon) */}
        <SearchGroup>
          <StyledInput
            type="text"
            placeholder="Search Product Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchImg src={SearchIcon} alt="검색" />
        </SearchGroup>

        {/* 로그인 버튼 */}
        <LoginFrame>
          <LoginText>Log In</LoginText>
        </LoginFrame>

        {/* 회원가입 버튼 */}
        <SignupFrame>
          <SignupText>Sign Up</SignupText>
        </SignupFrame>
      </HeaderWrapper>

      {/* 네비게이션 바 */}
      <Navbar>
        <LineSeparator />
        <List1Text>List 1</List1Text>
        <QAText>Q/A</QAText>
        <List3Text>List 3</List3Text>
        <ContactText>Contact Us</ContactText>
        <HomeText>Home</HomeText>

        <List2Group>
          <List2Text>List 2</List2Text>
        </List2Group>
      </Navbar>
    </Container>
  );
};

export default HeaderBasic;
