import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // [변경] axios 임포트 추가
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
  padding: 10px;
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

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #f0f0f0;
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
  background-color: ${(props) => (props.$isPrivate ? "#fff" : THEME_COLOR)};
  left: ${(props) => (props.$isPrivate ? "calc(100% - 22px)" : "2px")};
`;

const ToggleLabel = styled.span`
  font-size: 16px;
  color: #333;
  width: 50px;
  text-align: center;
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
`;

const StyledCheckbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  position: relative;

  &:checked {
    background-color: ${THEME_COLOR};
    border-color: ${THEME_COLOR};
  }

  &:checked::after {
    content: "✔";
    color: white;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
const ReviewModal = ({ onClose, productId = 82 }) => {
  const [isPrivate, setIsPrivate] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [agreed, setAgreed] = useState(false);

  // 상품 데이터 상태
  const [productData, setProductData] = useState({
    name: "로딩 중...",
    img: "",
  });

  // [1] 모달 열림 시 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // [2] API 호출: 상품 정보 가져오기
  useEffect(() => {
    if (!productId) return;

    const fetchProductInfo = async () => {
      try {
        // [변경] 실제 API 호출
        const response = await axios.get(
          `http://localhost:8222/subscriptions/productAcSpecs/${productId}`
        );
        const data = response.data;

        // [중요] DB에서 받아온 필드명(예: productName)을 화면용 상태(name)로 매핑
        // 만약 API 응답이 { productName: "...", productImage: "..." } 형태라면 아래처럼 작성:
        setProductData({
          name: data.productName || data.name || "상품명 없음",
          img: data.productImage || data.img || "",
        });
      } catch (error) {
        console.error("상품 정보를 불러오지 못했습니다:", error);
        setProductData({
          name: "상품 정보 로딩 실패",
          img: "",
        });
      }
    };

    fetchProductInfo();
  }, [productId]);

  return (
    <Overlay>
      <Container>
        <Title>리뷰 작성하기</Title>

        <ModalContent>
          {/* 상품 정보 및 토글 */}
          <ProductSection>
            <ProductInfo>
              {/* 이미지가 있으면 이미지 표시, 없으면 텍스트 박스 */}
              {productData.img ? (
                <ProductImage src={productData.img} alt="Product" />
              ) : (
                <ImagePlaceholder>Loading</ImagePlaceholder>
              )}

              <ProductDetails>
                {/* 받아온 상품명 표시 */}
                <h3>{productData.name}</h3>
                <RatingLabel>상품은 만족 하셨나요? | 선택하세요.</RatingLabel>
                <StarContainer>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      $filled={index < rating}
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
                활용될 수 있으며...
              </li>
              <li>부적절한 게시물은 운영 정책에 따라 삭제될 수 있습니다.</li>
              <li>개인정보(비밀번호, 연락처 등) 입력은 금지되어 있습니다.</li>
            </NoticeList>

            <AgreementCheck onClick={() => setAgreed(!agreed)}>
              <StyledCheckbox
                type="checkbox"
                checked={agreed}
                onChange={() => {}}
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
