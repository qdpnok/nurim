import React from "react";
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

const ModalContent = styled.div`
  background: #fff;
  width: 600px;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
`;
const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Description = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
`;
const ProductSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: left;
  img {
    width: 60px;
    height: 60px;
    background: #eee;
    border-radius: 4px;
  }
  .info {
    flex: 1;
  }
  .name {
    font-weight: bold;
    display: block;
    margin-bottom: 4px;
  }
  .cost-label {
    font-size: 13px;
    color: #555;
  }
  .cost-value {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    float: right;
  }
`;
const ConfirmButton = styled.button`
  background-color: #2f5d62;
  color: #fff;
  border: none;
  padding: 12px 40px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #244b4f;
  }
`;

const ReturnModal = ({ product, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>반납 신청 안내</ModalTitle>
        <Description>
          구독 기간이 만료되지 않은 경우 중도 해지 위약금이 발생할 수 있습니다.
          <br />
          아래 예상되는 비용을 확인 후 반납을 계속 진행하시겠습니까?
        </Description>
        <ProductSummary>
          <img src={product.image} alt="제품" />
          <div className="info">
            <span className="name">{product.name}</span>
            <span className="cost-label">납부 반납 비용 : </span>
            <span className="cost-value">{product.penaltyCost}</span>
          </div>
        </ProductSummary>
        <ConfirmButton onClick={onClose}>반납 신청</ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReturnModal;
