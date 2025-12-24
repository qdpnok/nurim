import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // [필수] 이동을 위한 훅

// [추가] 가격 데이터 import (경로 확인 필요)
import { productCardData } from "../../../data/productCardSpecs";

import acLg011 from "../../../img/ac_lg_01.png";
import airDy011 from "../../../img/air_dy_01.png";
import image1 from "../../../img/sam_tv_01.png";
import refSam021 from "../../../img/ref_sam_02.png";
import tvLg011 from "../../../img/tv_lg_01.png";
import tvSam031 from "../../../img/tv_sam_03.png";

// ... (스타일 컴포넌트들은 기존과 동일, 생략 없이 유지) ...
const Section = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 90px auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Article = styled.article`
  width: 30%;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer; /* [추가] 클릭 가능함을 표시 */
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px); /* [옵션] 호버 효과 */
  }

  @media (max-width: 900px) {
    width: 45%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const ProductName = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  min-height: 48px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Poppins", sans-serif;
  color: #ff3232;
  background-color: #ffeaea;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const PromotionsSection = () => {
  const navigate = useNavigate(); // [필수] 훅 선언

  // [수정] 제품별 이동 경로와 실제 데이터 ID를 매핑합니다.
  const allProducts = [
    {
      id: 51, // 실제 데이터 ID
      image: tvLg011,
      alt: "Tv lg",
      name: "LG전자 스탠바이미 27ART10AKPL",
      discount: "-10%",
      path: "/purchase/productTvSpecs/51", // 이동할 경로
    },
    {
      id: 53,
      image: image1,
      alt: "Image",
      name: "삼성전자 더 세리프 55인치_KQ55LST01BFXKR",
      discount: "-36%",
      path: "/purchase/productTvSpecs/53",
    },
    {
      id: 84,
      image: acLg011,
      alt: "Ac lg",
      name: "LG전자 오브제컬렉션 휘센 위너 스탠드에어컨",
      discount: "-10%",
      path: "/purchase/productAcSpecs/84",
    },
    {
      id: 55,
      image: tvSam031,
      alt: "Tv sam",
      name: "삼성전자 더 세로 QLED TV KQ43LST05BFXKR",
      discount: "-16%",
      path: "/purchase/productTvSpecs/55",
    },
    {
      id: 95,
      image: airDy011,
      alt: "Air dy",
      name: "다이슨 쿨 공기청정기 TP07",
      discount: "-13%",
      path: "/purchase/productAirSpecs/95",
    },
    {
      id: 65,
      image: refSam021,
      alt: "Ref sam",
      name: "삼성전자 양문형냉장고 RS84T5081SA",
      discount: "-34%",
      path: "/purchase/productRefSpecs/65",
    },
  ];

  // 클릭 핸들러
  const handleProductClick = (path) => {
    navigate(path);
  };

  return (
    <Section>
      <Header>
        <Title>BEST PRODUCT_All</Title>
      </Header>
      <Grid>
        {allProducts.map((product) => {
          // [수정] productCardData에서 가격 가져오기 (없으면 '0won')
          const priceData = productCardData[product.id];
          const displayPrice =
            priceData && priceData.prices
              ? `${priceData.prices.buy.toLocaleString()}won`
              : "0won";

          return (
            <Article
              key={product.id}
              onClick={() => handleProductClick(product.path)} // 클릭 시 이동
            >
              <ProductImage src={product.image} alt={product.alt} />
              <ProductName>{product.name}</ProductName>
              <InfoRow>
                {/* [수정] 가져온 가격 데이터 표시 */}
                <Price>{displayPrice}</Price>
                <Discount>{product.discount}</Discount>
              </InfoRow>
            </Article>
          );
        })}
      </Grid>
    </Section>
  );
};
