import React, { useState } from "react";
import styled from "styled-components";
import api from "../../../api/Axios";

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
  .error {
    font-size: 11px;
    color: #e74c3c;
    margin-top: 5px;
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

// [수정] memberNum props 추가
const PasswordChangeModal = ({ onClose, memberNum }) => {
  const [step, setStep] = useState("input"); // input -> completed
  const [newPwd, setNewPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    // 1. 유효성 검사
    if (newPwd.length < 8) {
      setErrorMsg("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (newPwd !== checkPwd) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 2. API 호출 (백엔드 엔드포인트 확인 필요)
      // 예: PUT /api/mypage/password/{memberNum}
      const response = await api.post(`/mypage/my-info/pwd/${memberNum}`, {
        pwd: newPwd,
      });

      if (response.status === 200) {
        setStep("completed");
      }
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      setErrorMsg("비밀번호 변경 중 오류가 발생했습니다.");
    }
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
            value={newPwd}
            onChange={(e) => {
              setNewPwd(e.target.value);
              setErrorMsg("");
            }}
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
            value={checkPwd}
            onChange={(e) => {
              setCheckPwd(e.target.value);
              setErrorMsg("");
            }}
          />
          {errorMsg && <p className="error">{errorMsg}</p>}
        </InputGroup>

        <ActionButton onClick={handleSubmit}>변경 하기</ActionButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PasswordChangeModal;
