import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const ConsultationModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <Overlay>
      <ModalBox>
        <Header>
          <h2>상담 내용</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </Header>

        <ScrollBody>
          <Section>
            <Label>제품 정보</Label>
            <ProductInfo>
              <div className="img-box">IMAGE</div>{" "}
              {/* 실제 이미지가 있다면 img 태그로 교체 */}
              <div className="text-info">
                <h4>{data.product}</h4>
                <p>27ART10AKPL (모델명)</p>
              </div>
            </ProductInfo>
          </Section>

          <Section>
            <Label>상담 유형</Label>
            <ReadOnlyInput value={data.type} readOnly />
          </Section>

          <Section>
            <Label>상담 희망 일시</Label>
            <ReadOnlyInput value="2025.12.20" readOnly />
          </Section>

          <Section>
            <Label>신청자 정보</Label>
            <Row>
              <div style={{ flex: 1 }}>
                <SubLabel>이름</SubLabel>
                <ReadOnlyInput value={data.user} readOnly />
              </div>
            </Row>
            <Row>
              <div style={{ flex: 1 }}>
                <SubLabel>아이디</SubLabel>
                <ReadOnlyInput value="nurim_user" readOnly />
              </div>
            </Row>
            <Row>
              <div style={{ flex: 1 }}>
                <SubLabel>휴대폰</SubLabel>
                <div style={{ display: "flex", gap: "10px" }}>
                  <ReadOnlyInput
                    value="+82"
                    style={{ width: "80px" }}
                    readOnly
                  />
                  <ReadOnlyInput value="010-1234-5678" readOnly />
                </div>
              </div>
            </Row>
          </Section>

          <Section>
            <Label>상담 신청 내용</Label>
            <MessageBox>
              안녕하세요, {data.product} 구독을 고민 중입니다. 36개월 약정이랑
              60개월 약정의 월 렌탈료 차이가 정확히 얼마인지 궁금합니다. 그리고
              약정 기간을 60개월로 길게 하면, 무상 A/S 기간도 똑같이 5년 동안
              보장되는 건가요? 약정이 끝난 뒤에는 별도 비용 없이 기기가 제
              소유가 되는 건지도 궁금합니다.
            </MessageBox>
          </Section>
        </ScrollBody>

        <Footer>
          <button className="close-btn" onClick={onClose}>
            닫기
          </button>
          <button className="confirm-btn">상담 완료</button>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};

export default ConsultationModal;

// --- 스타일 ---
const Overlay = styled.div`
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

const ModalBox = styled.div`
  background: white;
  width: 600px;
  max-height: 90vh;
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ScrollBody = styled.div`
  overflow-y: auto;
  padding-right: 10px;
  flex: 1;
`;

const Section = styled.div`
  margin-bottom: 25px;
`;
const Row = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 15px;
`;
const SubLabel = styled.span`
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  .img-box {
    width: 80px;
    height: 80px;
    background: #f5f5f5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    font-size: 12px;
  }
  h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
  }
  p {
    margin: 0;
    color: #888;
    font-size: 13px;
  }
`;

const ReadOnlyInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 6px;
  background: #fff;
  color: #555;
  outline: none;
`;

const MessageBox = styled.div`
  width: 100%;
  padding: 20px;
  background: #e0e0e0;
  border-radius: 8px;
  line-height: 1.6;
  font-size: 14px;
  color: #333;
`;

const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  button {
    padding: 12px 30px;
    border-radius: 25px;
    border: 1px solid #375a55;
    cursor: pointer;
    font-weight: bold;
  }
  .close-btn {
    background: white;
    color: #375a55;
  }
  .confirm-btn {
    background: #375a55;
    color: white;
  }
`;
