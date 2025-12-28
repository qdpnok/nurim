import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PasswordChangeModal from "../../Modal/PasswordChangeModal";
import UserInfoChangeModal from "../../Modal/UserInfoChangeModal";

const MainContainer = styled.div`
  width: 1074px;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd; /* 타이틀 하단 선 */
`;

const Section = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 30px;
  background-color: #fff;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }

  .value-box {
    background-color: #f5f5f5;
    padding: 15px 20px;
    border-radius: 8px;
    font-size: 15px;
    color: #333;
    font-weight: 500;
  }
`;

const ActionButton = styled.button`
  background-color: #356469; /* 포인트 컬러 */
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 0 auto; /* 가운데 정렬 */

  &:hover {
    background-color: #2a5054;
  }
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 우측 정렬 */
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 12px 40px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const MemberInfo = () => {
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(null);

  // [임시] 사용자 정보 (나중에는 Context나 API에서 받아옴)
  const userInfo = {
    id: "Jane Doe",
    email: "jane.doe@example.com",
    name: "Jane Doe",
    phone: "+1 234 567 890",
  };

  const closeAllModals = () => setActiveModal(null);

  return (
    <MainContainer>
      {" "}
      {/* 기존 스타일 MainContainer 사용 */}
      <PageTitle>회원 정보</PageTitle>
      {/* 1. 로그인 정보 섹션 */}
      <Section>
        <SectionTitle>로그인 정보</SectionTitle>
        <InfoRow>
          <InfoItem>
            <label>아이디</label>
            <div className="value-box">{userInfo.id}</div>
          </InfoItem>
          <InfoItem>
            <label>이메일</label>
            <div className="value-box">{userInfo.email}</div>
          </InfoItem>
        </InfoRow>

        {/* [수정] 클릭 시 비밀번호 모달 열기 */}
        <ActionButton onClick={() => setActiveModal("password")}>
          비밀번호 변경하기
        </ActionButton>
      </Section>
      {/* 2. 회원 정보 섹션 */}
      <Section>
        <SectionTitle>회원 정보</SectionTitle>
        <InfoRow>
          <InfoItem>
            <label>이름</label>
            <div className="value-box">{userInfo.name}</div>
          </InfoItem>
          <InfoItem>
            <label>이메일</label>
            <div className="value-box">{userInfo.email}</div>
          </InfoItem>
        </InfoRow>
        <InfoRow>
          <InfoItem>
            <label>휴대폰 번호</label>
            <div className="value-box">{userInfo.phone}</div>
          </InfoItem>
          <InfoItem style={{ visibility: "hidden" }} />
        </InfoRow>

        {/* [수정] 클릭 시 회원정보 모달 열기 */}
        <ActionButton onClick={() => setActiveModal("userInfo")}>
          회원정보 변경하기
        </ActionButton>
      </Section>
      <CloseButtonWrapper>
        <CloseButton onClick={() => navigate(-1)}>닫기</CloseButton>
      </CloseButtonWrapper>
      {/* [추가] 모달 렌더링 조건 */}
      {activeModal === "password" && (
        <PasswordChangeModal onClose={closeAllModals} />
      )}
      {activeModal === "userInfo" && (
        <UserInfoChangeModal onClose={closeAllModals} />
      )}
    </MainContainer>
  );
};

export default MemberInfo;
