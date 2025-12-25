import React, { useState } from "react";
import styled from "styled-components";

// --- Styled Components Definitions ---

const THEME_COLOR = "#2F6162";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  width: 1200px;
  height: 1055px;
  background-color: white;
  border-radius: 12px;
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
`;

const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px; /* 스크롤바 공간 확보 */
`;

/* --- Product Info Section --- */
const ProductSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const ImagePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #999;
  font-size: 20px;
`;

const ProductDetails = styled.div`
  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
  }
`;

const RatingLabel = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
`;

const StarContainer = styled.div`
  font-size: 28px;
  color: #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: ${(props) => (props.$filled ? THEME_COLOR : "#ddd")};
  margin-right: 2px;
  transition: color 0.2s;
`;

const RatingScore = styled.span`
  font-size: 20px;
  color: #000;
  margin-left: 10px;
`;

/* --- Toggle Switch --- */
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  width: 50px;
  height: 26px;
  border-radius: 13px;
  position: relative;
  transition: all 0.3s ease;

  /* 비공개($isPrivate=true)일 때 배경 채움, 공개일 때 흰색 */
  background-color: ${(props) => (props.$isPrivate ? THEME_COLOR : "#fff")};
  border: 2px solid ${THEME_COLOR};
`;

const ToggleCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;

  /* 비공개일 때: 흰색 원, 오른쪽 이동 */
  /* 공개일 때: 테마색 원, 왼쪽 위치 */
  background-color: ${(props) => (props.$isPrivate ? "#fff" : THEME_COLOR)};
  left: ${(props) => (props.$isPrivate ? "calc(100% - 22px)" : "2px")};
`;

const ToggleLabel = styled.span`
  font-size: 16px;
  color: #333;
`;

/* --- Review Input Section --- */
const ReviewInputBox = styled.div`
  background-color: #e9e9e9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const SectionLabel = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  border: none;
  padding: 15px;
  font-size: 15px;
  resize: none;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: 2px solid ${THEME_COLOR};
  }
`;

/* --- Notice Section --- */
const NoticeSection = styled.div`
  margin-top: 20px;
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const NoticeList = styled.ul`
  font-size: 13px;
  color: #333;
  line-height: 1.6;
  padding-left: 20px;
  margin-bottom: 20px;

  li {
    margin-bottom: 4px;
  }
`;

const AgreementCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  input {
    accent-color: ${THEME_COLOR};
    width: 18px;
    height: 18px;
  }
`;

/* --- Footer --- */
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Button = styled.button`
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const CloseButton = styled(Button)`
  background-color: #888;
  color: white;
`;

const SubmitButton = styled(Button)`
  background-color: ${THEME_COLOR};
  color: white;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// --- Main Component ---

const ReviewModal = ({ onClose }) => {
  const [isPrivate, setIsPrivate] = useState(true); // 기본값: 비공개
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <Overlay>
      <Container>
        <Title>리뷰 작성하기</Title>

        <ModalContent>
          {/* 상품 정보 및 토글 */}
          <ProductSection>
            <ProductInfo>
              <ImagePlaceholder>27"</ImagePlaceholder>
              <ProductDetails>
                <h3>LG전자 스탠바이미</h3>
                <RatingLabel>상품은 만족 하셨나요? | 선택하세요.</RatingLabel>
                <StarContainer>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      $filled={index < rating} // styled-components에 prop 전달
                      onClick={() => setRating(index + 1)}
                    >
                      ★
                    </Star>
                  ))}
                  <RatingScore>{rating}/5</RatingScore>
                </StarContainer>
              </ProductDetails>
            </ProductInfo>

            {/* 토글 버튼 */}
            <ToggleWrapper onClick={() => setIsPrivate(!isPrivate)}>
              {/* $isPrivate prop을 전달하여 스타일 동적 제어 */}
              <ToggleSwitch $isPrivate={isPrivate}>
                <ToggleCircle $isPrivate={isPrivate} />
              </ToggleSwitch>
              <ToggleLabel>{isPrivate ? "비공개" : "공개"}</ToggleLabel>
            </ToggleWrapper>
          </ProductSection>

          {/* 리뷰 입력 */}
          <ReviewInputBox>
            <SectionLabel>(필수) 제품 사용 후기를 남겨주세요.</SectionLabel>
            <ReviewTextarea
              placeholder="제품 후기를 자유롭게 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </ReviewInputBox>

          {/* 유의사항 */}
          <NoticeSection>
            <NoticeHeader>
              <span style={{ color: "orange" }}>⚠️</span> 리뷰 작성 시 유의사항
            </NoticeHeader>
            <NoticeList>
              <li>
                작성하신 리뷰(사진 포함)는 서비스 홍보 및 상세 페이지 등에
                활용될 수 있으며, 타인의 저작권 침해 시 책임은 작성자에게
                있습니다.
              </li>
              <li>부적절한 게시물은 운영 정책에 따라 삭제될 수 있습니다.</li>
              <li>
                상품과 무관한 리뷰, 욕설, 비방 등은 통보 없이 삭제될 수
                있습니다.
              </li>
              <li>
                개인정보(비밀번호, 연락처 등) 입력은 금지되어 있으며, 이에 대한
                책임은 본인에게 있습니다.
              </li>
              <li>저작권 침해에 대한 책임은 게시자 본인에게 있습니다.</li>
            </NoticeList>

            <AgreementCheck onClick={() => setAgreed(!agreed)}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => {}} // 부모의 onClick에서 처리
              />
              <label style={{ cursor: "pointer" }}>
                (필수) 개인정보 수집 및 게시물 이용 동의
              </label>
            </AgreementCheck>
          </NoticeSection>
        </ModalContent>

        <Footer>
          <CloseButton onClick={onClose}>닫기</CloseButton>
          <SubmitButton disabled={!agreed || reviewText.length === 0}>
            리뷰 등록 하기
          </SubmitButton>
        </Footer>
      </Container>
    </Overlay>
  );
};

export default ReviewModal;

// 모달 사용을 위한 코드.

// const [isModalOpen, setIsModalOpen] = useState(false);
// const openModal = () => {
//   setIsModalOpen(true);
// };

// // 모달 닫기 함수
// const closeModal = () => {
//   setIsModalOpen(false);
// };

//   <StartButton onClick={openModal}>asdasd</StartButton>
// {isModalOpen && <ReviewModal onClose={closeModal} />}

// import React, { useState } from "react";
// import ReviewModal from "../Popup/ReviewPopUp";
