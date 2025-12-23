import React from "react";
import styled from "styled-components";
import yellowStar from "../../../img/yellowstaricon.png";
import greyStar from "../../../img/graystaricon.png";
import { useNavigate } from "react-router-dom";

// --- Styled Components ---

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
  /* 카드 전체 클릭 방지를 위해 cursor: pointer 제거 */
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer; /* [수정] 이미지 위에 올리면 손가락 모양 */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05); /* [옵션] 이미지 살짝 확대 효과 */
  }
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
  cursor: pointer; /* [수정] 제목 위에 올리면 손가락 모양 */

  &:hover {
    color: #356469; /* [옵션] 제목에 마우스 올리면 색상 변경 */
    text-decoration: underline;
  }
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

  // [중요] index.js의 키값과 일치하도록 "Specs"를 제거했습니다.
  const getCategoryKey = (koreanName) => {
    switch (koreanName) {
      case "TV":
        return "productTvSpecs";
      case "냉장고":
        return "productRefSpecs";
      case "에어컨":
        return "productAcSpecs";
      case "세탁기":
        return "productWtSpecs";
      case "공기청정기":
        return "productAirSpecs";
      default:
        return "productTvSpecs";
    }
  };

  const handleItemClick = () => {
    if (!product.id) {
      console.error("상품 ID가 없습니다!", product);
      alert("상품 정보를 불러오지 못했습니다.");
      return;
    }

    const basePath = type === "subscription" ? "/subscriptions" : "/purchase";
    const categoryKey = getCategoryKey(product.category);

    nav(`${basePath}/${categoryKey}/${product.id}`);
  };

  return (
    // [수정] ProductCard에서 onClick 제거
    <ProductCard>
      {/* [수정] 이미지 래퍼에 onClick 추가 */}
      <ProductImageWrapper onClick={handleItemClick}>
        <ProductImage src={product.image} alt={product.alt} />
      </ProductImageWrapper>

      {/* [수정] 제목 텍스트에 onClick 추가 */}
      <TitleText onClick={handleItemClick}>{product.name}</TitleText>

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
