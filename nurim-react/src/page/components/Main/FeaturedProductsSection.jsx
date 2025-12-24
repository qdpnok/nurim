import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // [필수] 이동을 위한 훅

// [추가] 가격 데이터 import (경로 확인 필요)
import { productCardData } from "../../../data/productCardSpecs";

import acLg021 from "../../../img/ac_lg_01.png";
import washLg051 from "../../../img/wash_lg_05.png";
import refSam021 from "../../../img/ref_sam_02.png";
import tvsam01 from "../../../img/sam_tv_01.png";

const Section = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 90px auto;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 23%; /* Approx 4 items per row */
  min-width: 250px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;

  /* [추가] 클릭 가능 표시 및 호버 효과 */
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 살짝 그림자 추가 */
  }

  @media (max-width: 1024px) {
    width: 45%; /* 2 items per row */
  }
  @media (max-width: 600px) {
    width: 100%; /* 1 item per row */
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductName = styled.p`
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  margin: 10px 0 5px 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Price = styled.div`
  font-family: "Poppins", Helvetica, sans-serif;
  font-size: 1rem;
`;

const Discount = styled.div`
  font-family: "Poppins", Helvetica, sans-serif;
  color: #ff3232;
  font-size: 1rem;
`;

export const FeaturedProductsSection = () => {
  const navigate = useNavigate(); // [필수] 훅 선언

  // [수정] ID를 실제 데이터 ID로 변경하고 path 추가
  const products = [
    {
      id: 75, // 워시타워 (실제 데이터 ID 확인 필요)
      image: washLg051,
      alt: "Wash lg",
      name: "LG전자 트롬 AI 오브제컬렉션 워시타워_WL21WDU",
      discount: "-40% off",
      path: "/purchase/productWtSpecs/75",
    },
    {
      id: 65, // 양문형 냉장고
      image: refSam021,
      alt: "Ref sam",
      name: "삼성전자 양문형냉장고_RS84T5081SA",
      discount: "-34% off",
      path: "/purchase/productRefSpecs/65",
    },
    {
      id: 53, // 더 세리프
      image: tvsam01,
      alt: "Image",
      name: "삼성전자 더 세리프 55인치_KQ55LST01BFXKR",
      discount: "-36% off",
      path: "/purchase/productTvSpecs/53",
    },
    {
      id: 84, // 오브제컬렉션 에어컨
      image: acLg021,
      alt: "Ac lg",
      name: "LG전자 오브제컬렉션 휘센 듀얼 히트_FQ18HDDHA1",
      discount: "-30% off",
      path: "/purchase/productAcSpecs/84",
    },
  ];

  // 클릭 핸들러
  const handleProductClick = (path) => {
    navigate(path);
  };

  return (
    <Section>
      <Header>
        <Title>Today’s hot deals</Title>
      </Header>
      <Grid>
        {products.map((product) => {
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
