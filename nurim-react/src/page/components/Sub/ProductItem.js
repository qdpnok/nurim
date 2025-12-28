import React, { useMemo } from "react";
import styled from "styled-components";
import yellowStar from "../../../img/yellowstaricon.png";
import greyStar from "../../../img/graystaricon.png";
import { useNavigate } from "react-router-dom";

// --- 스타일 컴포넌트 ---
const ProductCard = styled.div`
  width: 380px;
  /* [수정] 높이를 고정하여 모든 카드가 동일한 크기를 갖도록 함 */
  height: ${(props) => (props.$isRecommend ? "450px" : "570px")};
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  align-items: flex-start;
  transition: all 0.2s ease-in-out;
  overflow: hidden; /* 내용이 넘치면 숨김 */
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;
  /* 이미지 영역 높이 고정 */
  height: 200px;
  align-items: center; /* 이미지 세로 중앙 정렬 */

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  /* 이미지 크기 제한 및 비율 유지 */
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const TitleText = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
  line-height: 1.3;
  color: #000;
  cursor: pointer;

  /* [수정] 추천 제품일 경우 한 줄 말줄임표(...) 처리 */
  ${(props) =>
    props.$isRecommend &&
    `
    white-space: nowrap;      /* 텍스트가 다음 줄로 넘어가지 않게 함 */
    overflow: hidden;         /* 영역을 벗어나는 텍스트를 숨김 */
    text-overflow: ellipsis;  /* 숨겨진 텍스트 끝에 말줄임표(...) 표시 */
    display: block;           /* 블록 요소로 만들어 너비를 가득 채움 */
    width: 100%;              /* 부모 요소 너비에 맞춤 */
  `}

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
  height: 60px; /* 스펙 영역 높이 고정 */
  overflow: hidden;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-top: auto; /* 내용이 적어도 하단으로 밀어줌 (선택 사항) */
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
  margin-bottom: ${(props) => (props.$isRecommend ? "0" : "25px")};
  width: 100%;
  /* 추천 제품일 경우 버튼이 없으므로 하단 여백 조정 */
  margin-top: ${(props) => (props.$isRecommend ? "auto" : "0")};
`;

const PriceText = styled.span`
  font-size: 24px;
  font-weight: bold;
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
  margin-top: auto; /* 버튼을 항상 최하단으로 */

  &:hover {
    background-color: #2a5054;
  }
`;

const ProductItem = ({ product, type, isRecommend = false }) => {
  const nav = useNavigate();

  const { rating, reviewCount } = useMemo(() => {
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
    const id = product.id || product.pNum || product.num;
    if (!id) {
      alert("상품 정보를 불러오지 못했습니다.");
      return;
    }
    const basePath = type === "subscription" ? "/subscriptions" : "/purchase";
    const categoryKey = getCategoryKey(product.category || "TV");
    nav(`${basePath}/${categoryKey}/${id}`);
    window.scrollTo(0, 0);
  };

  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/200x200?text=NoImage";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return img;
    return `/images/${img}`;
  };

  const imageUrl = getImageUrl(product.image);

  return (
    <ProductCard $isRecommend={isRecommend}>
      <ProductImageWrapper onClick={handleItemClick}>
        <ProductImage
          src={imageUrl}
          alt={product.name}
          onError={(e) =>
            (e.target.src = "https://placehold.co/200x200?text=NoImage")
          }
        />
      </ProductImageWrapper>

      {/* TitleText에도 isRecommend 전달 */}
      <TitleText onClick={handleItemClick} $isRecommend={isRecommend}>
        {product.name}
      </TitleText>

      {!isRecommend && <SpecText>{product.spec}</SpecText>}

      <RatingWrapper>
        <StarContainer>
          {[1, 2, 3, 4, 5].map((index) => (
            <StarIcon
              key={index}
              src={index <= Math.round(rating) ? yellowStar : greyStar}
              alt="star"
            />
          ))}
        </StarContainer>
        <ReviewCount>
          {rating} / 5 ({reviewCount} reviews)
        </ReviewCount>
      </RatingWrapper>

      {/* PriceWrapper에도 isRecommend 전달하여 여백 조정 */}
      <PriceWrapper $isRecommend={isRecommend}>
        <PriceText $type={type}>{product.price}</PriceText>
        <DiscountText>{product.discount}</DiscountText>
      </PriceWrapper>

      {!isRecommend && (
        <CompareButton onClick={handleItemClick}>자세히 보기</CompareButton>
      )}
    </ProductCard>
  );
};

export default ProductItem;
