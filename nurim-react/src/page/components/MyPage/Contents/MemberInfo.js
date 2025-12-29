import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/Axios";

import PasswordChangeModal from "../../Modal/PasswordChangeModal";
import UserInfoChangeModal from "../../Modal/UserInfoChangeModal";

// --- 스타일 정의 (기존 코드 유지) ---
const MainContainer = styled.div`
  width: 1074px;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
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
  background-color: #356469;
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #2a5054;
  }
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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

  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    name: "",
    phone: "",
  });

  // [수정 1] memberNum은 '회원 번호(ID)'여야 합니다. 토큰값이 아닙니다.
  // 실제로는 로그인 정보(Context/Redux)에서 내 번호를 가져오거나,
  // 토큰을 디코딩해서 가져와야 하지만, 일단 테스트를 위해 1번으로 고정합니다.
  const memberNum = 1;

  const fetchUserInfo = async () => {
    try {
      // [수정 2] 토큰 가져오기
      // 주의: 브라우저 localStorage에 실제 로그인 후 받은 유효한 JWT 토큰이 있어야 합니다.
      const token = localStorage.getItem("accessToken");

      if (!token || token === "dummy-token") {
        alert("유효하지 않은 토큰입니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
      }

      const response = await api.get(`/mypage/my-info/${memberNum}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰 첨부
        },
      });

      setUserInfo(response.data);
    } catch (error) {
      console.error("회원정보 로드 실패:", error);
      if (error.response && error.response.status === 401) {
        alert("인증이 만료되었습니다. 다시 로그인해주세요.");
        // 에러 발생 시 로컬스토리지 비우기 (선택사항)
        // localStorage.removeItem("accessToken");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const closeAllModals = () => {
    setActiveModal(null);
    fetchUserInfo();
  };
  return (
    <MainContainer>
      <PageTitle>회원 정보</PageTitle>

      {/* 1. 로그인 정보 섹션 */}
      <Section>
        <SectionTitle>로그인 정보</SectionTitle>
        <InfoRow>
          <InfoItem>
            <label>아이디</label>
            <div className="value-box">{userInfo.id || "-"}</div>
          </InfoItem>
          <InfoItem>
            <label>이메일</label>
            <div className="value-box">{userInfo.email || "-"}</div>
          </InfoItem>
        </InfoRow>
        <ActionButton onClick={() => setActiveModal("password")}>
          비밀번호 변경하기
        </ActionButton>
      </Section>

      <Section>
        <SectionTitle>회원 정보</SectionTitle>
        <InfoRow>
          <InfoItem>
            <label>이름</label>
            <div className="value-box">{userInfo.name || "-"}</div>
          </InfoItem>
          <InfoItem>
            <label>이메일</label>
            <div className="value-box">{userInfo.email || "-"}</div>
          </InfoItem>
        </InfoRow>
        <InfoRow>
          <InfoItem>
            <label>휴대폰 번호</label>
            <div className="value-box">{userInfo.phone || "-"}</div>
          </InfoItem>
          <InfoItem style={{ visibility: "hidden" }} />
        </InfoRow>
        <ActionButton onClick={() => setActiveModal("userInfo")}>
          회원정보 변경하기
        </ActionButton>
      </Section>

      <CloseButtonWrapper>
        <CloseButton onClick={() => navigate(-1)}>닫기</CloseButton>
      </CloseButtonWrapper>

      {activeModal === "password" && (
        <PasswordChangeModal onClose={closeAllModals} memberNum={memberNum} />
      )}
      {activeModal === "userInfo" && (
        <UserInfoChangeModal
          onClose={closeAllModals}
          memberNum={memberNum}
          initialData={userInfo}
        />
      )}
    </MainContainer>
  );
};

export default MemberInfo;
