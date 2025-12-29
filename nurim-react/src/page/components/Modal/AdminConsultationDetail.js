import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const ConsultationModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <h3>상담 상세 내용</h3>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </ModalHeader>

        <ModalBody>
          <Section>
            <Label>제품 정보</Label>
            <ProductInfo>
              {/* 이미지는 실제 경로로 교체 필요 */}
              <div className="img-placeholder">IMAGE</div>
              <div className="text">
                <h4>{data.product}</h4>
                <p>27ART10AKPL</p>
              </div>
            </ProductInfo>
          </Section>

          <Row>
            <Section>
              <Label>상담 유형</Label>
              <InputBox readOnly value={data.type} />
            </Section>
            <Section>
              <Label>신청자</Label>
              <InputBox readOnly value={data.user} />
            </Section>
          </Row>

          <Section>
            <Label>상담 신청 내용</Label>
            <MessageBox>
              안녕하세요, {data.product} 구독을 고민 중입니다. 36개월 약정이랑
              60개월 약정의 월 렌탈료 차이가 정확히 얼마인지 궁금합니다.
            </MessageBox>
          </Section>
        </ModalBody>

        <ModalFooter>
          <button className="cancel" onClick={onClose}>
            닫기
          </button>
          <button className="confirm">상담 완료 처리</button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default ConsultationModal;

// 스타일
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  width: 500px;
  border-radius: 12px;
  padding: 30px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h3 {
    margin: 0;
    font-size: 20px;
  }
  button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  flex: 1;
`;
const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f9f9f9;
`;

const MessageBox = styled.div`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f5f5f5;
  min-height: 100px;
  line-height: 1.5;
  font-size: 14px;
  color: #555;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 8px;
  .img-placeholder {
    width: 60px;
    height: 60px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 10px;
  }
  h4 {
    margin: 0 0 5px 0;
    font-size: 15px;
  }
  p {
    margin: 0;
    font-size: 12px;
    color: #888;
  }
`;

const ModalFooter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  button {
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
    font-weight: bold;
  }
  .cancel {
    background: white;
    border: 1px solid #ccc;
  }
  .confirm {
    background: #375a55;
    color: white;
  }
`;
