// components/Support/HelpModal.js
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const ModalBox = styled.div`
  width: 800px;
  background-color: white;
  padding: 50px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-weight: normal;
`;

const AnswerBox = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 40px;
  box-sizing: border-box;
  text-align: center;
  line-height: 1.6;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 30px;
`;

const CloseButton = styled.button`
  width: 150px;
  height: 45px;
  background-color: #2f6162;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #234e4f;
  }
`;

const HelpModal = ({ title, answer, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      {/* 모달 내부 클릭 시 닫히지 않도록 stopPropagation 처리 */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <AnswerBox>{answer}</AnswerBox>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalBox>
    </Overlay>
  );
};

export default HelpModal;
