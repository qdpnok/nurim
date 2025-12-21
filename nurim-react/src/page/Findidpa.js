import React from "react";
import styled from "styled-components";
import LoginBannerImg from "../img/LoginBGImg.jpg";

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 900px; // 전체 높이
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${LoginBannerImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  // 배경 어둡게 처리 (Overlay)
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 640px;
  height: 644px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "poppins";
  border-radius: 15px;
  flex-wrap: wrap;
`;

const MainTextBox = styled.h2`
  width: 1440px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IDBox = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const PWBox = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const FIP = () => {
  return (
    <Container>
      <ContentWrapper>
        <MainTextBox>Find ID ㆍ Password</MainTextBox>
        <IDBox>ID</IDBox>
        <PWBox>Password</PWBox>
        <p>Please enter your ID & email address.</p>
        <p> We will send you a verification code to issue a change password.</p>
      </ContentWrapper>
    </Container>
  );
};

export default FIP;
