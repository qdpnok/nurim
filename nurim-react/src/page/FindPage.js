import React, { useState } from "react";
import styled from "styled-components";
// 이미지 경로와 컴포넌트 경로는 본인의 프로젝트 구조에 맞게 수정해주세요.
import LoginBannerImg from "../img/LoginBGImg.jpg";
import FindId from "./components/FindId"; // 위에서 만든 파일
import FindPw from "./components/FindPw"; // 위에서 만든 파일

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
  flex-direction: column; /* 세로 정렬로 변경 */
  align-items: center;
  font-family: "Poppins", sans-serif;
  border-radius: 8px;
  padding: 40px; /* 내부 여백 추가 */
  box-sizing: border-box;
`;

const MainTextBox = styled.h2`
  width: 100%;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  /* margin-bottom: 30px; */
`;

// IDBox, PWBox를 통합하거나 props로 스타일 제어
const TabBox = styled.div`
  flex: 1; /* 반반 차지 */
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  /* 선택되었을 때와 아닐 때의 스타일 구분 */
  color: ${(props) => (props.isActive ? "#000000" : "#A0A0A0")};
  border-bottom: ${(props) =>
    props.isActive ? "2px solid #000000" : "1px solid #E0E0E0"};

  transition: all 0.2s;
`;

const InputTotalBox = styled.div`
  width: 100%; /* 부모에 맞춤 */
  flex: 1; /* 남은 공간 다 차지 */
  display: flex;
  justify-content: center;
  /* border: 1px solid gray; 개발 중에만 보이게 하고 나중엔 빼셔도 됩니다 */
`;

const FIP = () => {
  // 현재 탭 상태 관리 ('ID' 또는 'PW')
  const [activeTab, setActiveTab] = useState("ID");

  return (
    <Container>
      <ContentWrapper>
        <MainTextBox>Find ID · Password</MainTextBox>

        {/* 탭 버튼 영역 */}
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

        {/* 탭에 따라 내용 교체 */}
        <InputTotalBox>
          {activeTab === "ID" ? <FindId /> : <FindPw />}
        </InputTotalBox>
      </ContentWrapper>
    </Container>
  );
};

export default FIP;
