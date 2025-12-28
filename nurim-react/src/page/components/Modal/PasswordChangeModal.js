import React, { useState } from "react";
import styled from "styled-components";

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

// [동적 높이 조절] 완료 상태에 따라 높이 변경
const ModalContent = styled.div`
  background: white;
  width: 640px;
  height: ${(props) => (props.$isCompleted ? "280px" : "487px")};
  border-radius: 12px;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isCompleted ? "center" : "flex-start")};
  align-items: center;
  position: relative;
`;

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

const ActionButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  border: none;
  background-color: #8fa7a9; /* 이미지의 톤다운된 민트색 */
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
  background-color: #356469; /* 완료 모달의 짙은 색 */
  &:hover {
    background-color: #2a5054;
  }
`;

const PasswordChangeModal = ({ onClose }) => {
  const [step, setStep] = useState("input"); // input -> completed

  const handleSubmit = () => {
    // 여기에 비밀번호 변경 API 호출 로직 추가
    setStep("completed");
  };

  if (step === "completed") {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()} $isCompleted={true}>
          <SubText
            style={{ fontSize: "18px", color: "#000", marginBottom: "40px" }}
          >
            비밀번호 변경이 완료 되었습니다.
          </SubText>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isCompleted={false}>
        <Title>비밀번호 변경하기</Title>
        <SubText>
          안전한 서비스 이용을 위해 새로운 비밀번호를 설정해 주세요.
        </SubText>

        <InputGroup>
          <label>새 비밀번호 입력</label>
          <input
            type="password"
            placeholder="새로운 비밀번호를 입력해 주세요."
          />
          <p className="hint">
            영문, 숫자, 특수문자를 조합하여 8자 이상으로 설정해 주세요.
          </p>
        </InputGroup>

        <InputGroup>
          <label>비밀번호 재입력</label>
          <input
            type="password"
            placeholder="새로운 비밀번호를 한 번 더 입력해 주세요."
          />
        </InputGroup>

        <ActionButton onClick={handleSubmit}>변경 하기</ActionButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PasswordChangeModal;
