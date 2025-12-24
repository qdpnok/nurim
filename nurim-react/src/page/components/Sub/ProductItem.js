import React, { useMemo } from "react"; // useMemo 추가
import styled from "styled-components";
import yellowStar from "../../../img/yellowstaricon.png";
import greyStar from "../../../img/graystaricon.png";
import { useNavigate } from "react-router-dom";

// --- Styled Components (기존과 동일) ---
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
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
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
  cursor: pointer;

  &:hover {
    color: #356469;
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
  /* [수정] type이 'subscription'이면 빨간색, 아니면 파란색 */
  color: ${(props) => (props.$type === "subscription" ? "#e74c3c" : "#1a5ce0")};
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

  // [수정] 랜덤 별점 및 리뷰 수 생성 (useMemo로 값 고정)
  // useMemo를 안 쓰면 리렌더링 될 때마다 별점이 바뀝니다.
  const { rating, reviewCount } = useMemo(() => {
    // product.rating이 있으면 쓰고, 없으면(0이면) 랜덤 생성
    const randomRating =
      product.rating || (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
    const randomReview =
      product.reviewCount || Math.floor(Math.random() * (120 - 10 + 1)) + 10;

    return { rating: Number(randomRating), reviewCount: randomReview };
  }, [product.rating, product.reviewCount]);

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
      alert("상품 정보를 불러오지 못했습니다.");
      return;
    }
    const basePath = type === "subscription" ? "/subscriptions" : "/purchase";
    const categoryKey = getCategoryKey(product.category);
    nav(`${basePath}/${categoryKey}/${product.id}`);
  };

  return (
    <ProductCard>
      <ProductImageWrapper onClick={handleItemClick}>
        <ProductImage src={`/images/${product.image}`} alt={product.alt} />
      </ProductImageWrapper>

      <TitleText onClick={handleItemClick}>{product.name}</TitleText>

      <SpecText>{product.spec}</SpecText>

      <RatingWrapper>
        <StarContainer>
          {/* [수정] rating 값에 따라 노란별/회색별 렌더링 */}
          {[1, 2, 3, 4, 5].map((index) => (
            <StarIcon
              key={index}
              src={index <= Math.round(rating) ? yellowStar : greyStar}
              alt="star"
            />
          ))}
        </StarContainer>
        {/* [수정] 랜덤 생성된 리뷰 수 표시 */}
        <ReviewCount>
          ({rating}) ({reviewCount} reviews)
        </ReviewCount>
      </RatingWrapper>

      <PriceWrapper>
        {/* [수정] $type props 전달하여 색상 변경 */}
        <PriceText $type={type}>{product.price}</PriceText>
        <DiscountText>{product.discount}</DiscountText>
      </PriceWrapper>

      <CompareButton>비교 하기</CompareButton>
    </ProductCard>
  );
};

export default ProductItem;
