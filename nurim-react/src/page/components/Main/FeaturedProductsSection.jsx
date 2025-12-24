import React from "react";
import styled from "styled-components";

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
  const products = [
    {
      id: 1,
      image: washLg051,
      alt: "Wash lg",
      name: "LG전자 트롬 AI 오브제컬렉션 워시타워_WL21WDU",
      price: "2,650,000won",
      discount: "-40% off",
    },
    {
      id: 2,
      image: refSam021,
      alt: "Ref sam",
      name: "삼성전자 양문형냉장고_RS84T5081SA",
      price: "1,500,000won",
      discount: "-34% off",
    },
    {
      id: 3,
      image: tvsam01,
      alt: "Image",
      name: "삼성전자 더 세리프 55인치_KQ55LST01BFXKR",
      price: "1,450,000won",
      discount: "-36% off",
    },
    {
      id: 4,
      image: acLg021,
      alt: "Ac lg",
      name: "LG전자 오브제컬렉션 휘센 듀얼 히트_FQ18HDDHA1",
      price: "2,430,000won",
      discount: "-30% off",
    },
  ];

  return (
    <Section>
      <Header>
        <Title>Today’s hot deals</Title>
      </Header>
      <Grid>
        {products.map((product) => (
          <Article key={product.id}>
            <ProductImage src={product.image} alt={product.alt} />
            <ProductName>{product.name}</ProductName>
            <InfoRow>
              <Price>{product.price}</Price>
              <Discount>{product.discount}</Discount>
            </InfoRow>
          </Article>
        ))}
      </Grid>
    </Section>
  );
};
