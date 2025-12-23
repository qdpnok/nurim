import React from "react";
import styled from "styled-components";
import yellowStar from "../../../img/yellowstaricon.png"; // 경로 확인 필요
import greyStar from "../../../img/graystaricon.png"; // 경로 확인 필요
import { useNavigate } from "react-router-dom";

// --- Styled Components (이 파일에서만 쓰이는 스타일) ---
const ProductCard = styled.div`
  width: 380px;
  height: 570px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  align-items: flex-start;
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
  object-fit: contain;
`;

const TitleText = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
  line-height: 1.3;
  white-space: pre-wrap;
  color: #000;
`;

const SpecText = styled.p`
  font-size: 13px;
  color: #757575;
  margin: 0 0 15px 0;
  line-height: 1.5;
  white-space: pre-wrap;
  height: 60px;
  overflow: hidden;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-right: 8px;
`;

const StarIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const ReviewCount = styled.span`
  font-size: 13px;
  color: #9e9e9e;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
  width: 100%;
`;

const PriceText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #1a5ce0;
`;

const DiscountText = styled.span`
  font-size: 18px;
  color: #ff3b30;
`;

const CompareButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #356469;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: auto;

  &:hover {
    background-color: #2a5054;
  }
`;

const ProductItem = ({ product, type }) => {
  const nav = useNavigate();
  const rating = product.rating || 0;

  // [핵심] 한글 카테고리명 -> 데이터 파일 키값 매핑
  const getCategoryKey = (koreanName) => {
    switch (koreanName) {
      case "TV":
        return "productTv";
      case "냉장고":
        return "productRef";
      case "에어컨":
        return "productAc";
      case "세탁기":
        return "productWt";
      case "공기청정기":
        return "productAir";
      default:
        return "productTv"; // 기본값
    }
  };

  const handleItemClick = () => {
    const basePath = type === "subscription" ? "/subscriptions" : "/purchase";

    // 여기서 영어 키값(productAc 등)을 가져옵니다.
    const categoryKey = getCategoryKey(product.category);

    // 최종 URL 이동: /subscriptions/productAc/1
    nav(`${basePath}/${categoryKey}/${product.id}`);
  };

  return (
    <ProductCard onClick={handleItemClick}>
      <ProductImageWrapper>
        <ProductImage src={product.image} alt={product.alt} />
      </ProductImageWrapper>

      <TitleText>{product.name}</TitleText>
      <SpecText>{product.spec}</SpecText>

      <RatingWrapper>
        <StarContainer>
          {[0, 1, 2, 3, 4].map((index) => (
            <StarIcon
              key={index}
              src={index < rating ? yellowStar : greyStar}
              alt="star"
            />
          ))}
        </StarContainer>
        {/* <RatingScore>{rating}.0</RatingScore> */}
        <ReviewCount>({product.reviewCount})</ReviewCount>
      </RatingWrapper>

      <PriceWrapper>
        <PriceText>{product.price}</PriceText>
        <DiscountText>{product.discount}</DiscountText>
      </PriceWrapper>

      <CompareButton>비교 하기</CompareButton>
    </ProductCard>
  );
};

export default ProductItem;
