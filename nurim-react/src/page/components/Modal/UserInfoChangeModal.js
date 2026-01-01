import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../../api/Axios"; // API 인스턴스 import

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 640px;
  height: ${(props) => (props.$isCompleted ? "280px" : "660px")};
  border-radius: 12px;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isCompleted ? "center" : "flex-start")};
  align-items: center;
`;

// ... (Title, SubText, InputGroup 등 기존 스타일 코드는 동일) ...
const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const SubText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  line-height: 1.4;
`;
const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
  label {
    display: block;
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #555;
  }
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    &::placeholder {
      color: #ccc;
    }
  }
  .hint {
    font-size: 11px;
    color: #888;
    margin-top: 5px;
  }
`;
const NoticeBox = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 12px;
  color: #666;
  strong {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  ul {
    padding-left: 15px;
    margin: 0;
  }
  li {
    margin-bottom: 3px;
  }
`;
const ActionButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  border: none;
  background-color: #8fa7a9;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: auto;
  &:hover {
    background-color: #768f91;
  }
`;
const ConfirmButton = styled(ActionButton)`
  background-color: #356469;
  &:hover {
    background-color: #2a5054;
  }
`;

// [수정] props에 memberNum, initialData 추가
const UserInfoChangeModal = ({ onClose, memberNum, initialData }) => {
  const [step, setStep] = useState("input");

  // 입력 상태 관리
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // 모달 열릴 때 기존 데이터로 초기화
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPhone(initialData.phone || initialData.phone_num || "");
    }
  }, [initialData]);

  const handleSubmit = async () => {
    try {
      // [수정] 백엔드 경로와 메서드(POST)에 맞게 수정
      // 경로: /api/mypage/my-info/info/{memberNum}
      const response = await api.post(`/mypage/my-info/info/${memberNum}`, {
        name: name,
        // [체크] 백엔드 DTO(ChangeInfoReqDto)의 변수명이 phoneNum이라면 아래처럼 고치세요.
        // phone이라면 그냥 phone: phone 으로 두시면 됩니다.
        phone: phone,
      });

      if (response.status === 200) {
        setStep("completed");
      }
    } catch (error) {
      console.error("회원정보 변경 실패:", error);
      alert("정보 변경에 실패했습니다. 입력값을 확인해주세요.");
    }
  };

  if (step === "completed") {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()} $isCompleted={true}>
          <SubText
            style={{ fontSize: "18px", color: "#000", marginBottom: "40px" }}
          >
            회원정보 변경이 완료 되었습니다.
          </SubText>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isCompleted={false}>
        <Title>회원정보 변경하기</Title>
        <SubText>
          원활한 서비스 이용을 위해 최신 정보를 유지해 주세요.
          <br />
          변경을 위해 새로운 정보를 입력하신 후 하단의 '변경 하기' 버튼을 클릭해
          주세요.
        </SubText>

        <InputGroup>
          <label>이름 변경하기</label>
          <input
            type="text"
            placeholder="새로운 이름을 입력해 주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label>휴대폰 번호 변경하기</label>
          <input
            type="text"
            placeholder="새로운 휴대폰 번호를 입력해 주세요."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="hint">
            본인 확인 및 서비스 안내를 위해 정확한 정보를 입력해 주세요.
          </p>
        </InputGroup>

        <NoticeBox>
          <strong>안내사항</strong>
          <ul>
            <li>
              개인정보 보호를 위해 타인에게 정보가 노출되지 않도록 주의해
              주세요.
            </li>
            <li>
              변경된 정보는 배송 및 AS 서비스 이용 시 기본 정보로 활용됩니다.
            </li>
          </ul>
        </NoticeBox>

        <ActionButton onClick={handleSubmit}>변경 하기</ActionButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserInfoChangeModal;
