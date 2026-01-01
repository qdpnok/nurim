import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/Axios"; // 인터셉터가 설정된 axios 인스턴스

import PasswordChangeModal from "../../Modal/PasswordChangeModal";
import UserInfoChangeModal from "../../Modal/UserInfoChangeModal";

// ... (스타일 정의 코드는 그대로 유지) ...
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
    regData: "",
  });

  // [수정 1] 로컬 스토리지에서 내 회원 번호 가져오기
  // 주의: 로그인 시 localStorage.setItem("memberNum", 번호) 로 저장해두어야 합니다.
  const memberNum = localStorage.getItem("memberNum");

  const fetchUserInfo = async () => {
    try {
      // memberNum이 없으면 로그인 페이지로 보냄
      if (!memberNum) {
        alert("로그인 정보가 없습니다.");
        navigate("/login");
        return;
      }

      // [수정 2] api.get 사용 (헤더 설정 불필요)
      // 이미 api.js에서 인터셉터로 토큰을 넣고 있으므로 여기선 주소만 적으면 됩니다.
      const response = await api.get(`/mypage/my-info/${memberNum}`);

      console.log("받아온 데이터:", response.data); // 디버깅용 로그
      setUserInfo(response.data);
    } catch (error) {
      console.error("회원정보 로드 실패:", error);
      // 401 에러(인증 실패)는 api.js 인터셉터 혹은 여기서 처리
      if (error.response && error.response.status === 401) {
        alert("로그인이 만료되었습니다.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("memberNum");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const closeAllModals = () => {
    setActiveModal(null);
    fetchUserInfo(); // 모달 닫을 때 정보 갱신
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
            {/* DB 컬럼 id */}
            <div className="value-box">{userInfo.id || "-"}</div>
          </InfoItem>
          <InfoItem>
            <label>이메일</label>
            {/* DB 컬럼 email */}
            <div className="value-box">{userInfo.email || "-"}</div>
          </InfoItem>
        </InfoRow>
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
            {/* DB 컬럼 name */}
            <div className="value-box">{userInfo.name || "-"}</div>
          </InfoItem>
          {/* 중복된 이메일 표시 대신 다른 정보를 넣거나 삭제 가능 */}
          <InfoItem>
            <label>가입일</label>

            <div className="value-box">
              {userInfo.regData ? userInfo.regData.split("T")[0] : "-"}
            </div>
          </InfoItem>
        </InfoRow>
        <InfoRow>
          <InfoItem>
            <label>휴대폰 번호</label>
            {/* [수정 3] DB 컬럼명 phone_num 에 맞춰서 바인딩 */}
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
