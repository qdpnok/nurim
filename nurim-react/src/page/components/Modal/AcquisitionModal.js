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

const AcquisitionModal = ({ product, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>인수 신청 안내</ModalTitle>
        <Description>
          소유권 이전을 위한 필수 과정 안내입니다.
          <br />
          신청 완료 후 잔여 인수 비용을 완납하시면 제품의 소유권은 고객님께
          안전하게 이전됩니다.
        </Description>
        <ProductSummary>
          <img src={product.image} alt="제품" />
          <div className="info">
            <span className="name">{product.name}</span>
            <span className="cost-label">남은 인수 비용 : </span>
            <span className="cost-value">{product.remainingCost}</span>
          </div>
        </ProductSummary>
        <ConfirmButton onClick={onClose}>인수 신청</ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AcquisitionModal;
