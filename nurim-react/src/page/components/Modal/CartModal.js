import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // 라우터 사용 시 필요

// --- Styled Components ---

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 배경을 어둡게 하려면 rgba(0,0,0,0.5) 등으로 변경, 
     현재는 이미지처럼 투명하거나 흰 배경 위라고 가정 */
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* 다른 요소보다 위에 뜨도록 설정 */
`;

const PopupBox = styled.div`
  width: 836px;
  height: 150px;
  background-color: #4b4b4b; /* 이미지와 유사한 짙은 회색 */
  border-radius: 75px; /* 높이(150px)의 절반을 주어 완벽한 타원형 생성 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Message = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 30px; /* 버튼 사이 간격 */
`;

const ActionLink = styled.span`
  font-size: 16px;
  cursor: pointer;
  text-decoration: underline; /* 텍스트 밑줄 */
  color: #d3d3d3; /* 흰색보다 살짝 어두운 색상 (취향에 따라 white로 변경 가능) */
  display: flex;
  align-items: center;

  &:hover {
    color: white;
  }
`;

// --- Component ---

const CartModal = ({ onClose }) => {
  const navigate = useNavigate(); // react-router-dom 사용 시

  const handleGoToCart = () => {
    // 장바구니 페이지 경로로 이동
    navigate("/cart");
    // 혹은 부모 컴포넌트에서 전달받은 함수 실행
    // onClose();
  };

  return (
    <Overlay onClick={onClose}>
      {/* Overlay 클릭 시 닫히게 하려면 onClick 추가, 박스 클릭은 이벤트 전파 막기 */}
      <PopupBox onClick={(e) => e.stopPropagation()}>
        <Message>선택하신 상품을 장바구니에 담았습니다.</Message>

        <ActionContainer>
          {/* 더 둘러보기: 모달 닫기 */}
          <ActionLink onClick={onClose}>더 둘러보기 &gt;</ActionLink>

          {/* 장바구니로 이동하기 */}
          <ActionLink onClick={handleGoToCart}>
            장바구니로 이동하기 &gt;
          </ActionLink>
        </ActionContainer>
      </PopupBox>
    </Overlay>
  );
};

export default CartModal;
