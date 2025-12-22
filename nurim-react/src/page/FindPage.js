import React, { useState } from "react";
import styled from "styled-components";
import LoginBannerImg from "../img/LoginBGImg.jpg";
import FindId from "./components/Auth/FindId";
import FindPw from "./components/Auth/FindPw";

// --- 스타일 정의 ---
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 900px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${LoginBannerImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  border-radius: 8px;
  padding: 30px;
  box-sizing: border-box;
`;

const MainTextBox = styled.h2`
  width: 100%;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`;

const TabBox = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? "#000000" : "#A0A0A0")};
  border-bottom: ${(props) =>
    props.isActive ? "2px solid #000000" : "1px solid #E0E0E0"};
  transition: all 0.2s;
`;

const InputTotalBox = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const FIP = () => {
  const [activeTab, setActiveTab] = useState("ID");

  return (
    <Container>
      <ContentWrapper>
        <MainTextBox>Find ID · Password</MainTextBox>
        <TabWrapper>
          <TabBox
            isActive={activeTab === "ID"}
            onClick={() => setActiveTab("ID")}
          >
            ID
          </TabBox>
          <TabBox
            isActive={activeTab === "PW"}
            onClick={() => setActiveTab("PW")}
          >
            PASSWORD
          </TabBox>
        </TabWrapper>
        <InputTotalBox>
          {activeTab === "ID" ? <FindId /> : <FindPw />}
        </InputTotalBox>
      </ContentWrapper>
    </Container>
  );
};

export default FIP;
