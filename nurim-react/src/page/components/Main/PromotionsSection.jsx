import React from "react";
import styled from "styled-components";

import acLg011 from "../../../img/ac_lg_01.png";
import airDy011 from "../../../img/air_dy_01.png";
import image1 from "../../../img/sam_tv_01.png";
import refSam021 from "../../../img/ref_sam_02.png";
import tvLg011 from "../../../img/tv_lg_01.png";
import tvSam031 from "../../../img/tv_sam_03.png";

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
  min-height: 48px; /* Maintain height for alignment */
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
  const allProducts = [
    {
      id: 1,
      image: tvLg011,
      alt: "Tv lg",
      name: "LG전자 스탠바이미 27ART10AKPL",
      price: "1,150,000won",
      discount: "-10%",
    },
    {
      id: 2,
      image: image1,
      alt: "Image",
      name: "삼성전자 더 세리프 55인치_KQ55LST01BFXKR",
      price: "1,450,000won",
      discount: "-36%",
    },
    {
      id: 3,
      image: acLg011,
      alt: "Ac lg",
      name: "LG전자 오브제컬렉션 휘센 위너 스탠드에어컨",
      price: "1,492,000won",
      discount: "-10%",
    },
    {
      id: 4,
      image: tvSam031,
      alt: "Tv sam",
      name: "삼성전자 더 세로 QLED TV KQ43LST05BFXKR",
      price: "1,450,000won",
      discount: "-16%",
    },
    {
      id: 5,
      image: airDy011,
      alt: "Air dy",
      name: "다이슨 쿨 공기청정기 TP07",
      price: "494,000won",
      discount: "-13%",
    },
    {
      id: 6,
      image: refSam021,
      alt: "Ref sam",
      name: "삼성전자 양문형냉장고 RS84T5081SA",
      price: "1,500,000won",
      discount: "-34%",
    },
  ];

  return (
    <Section>
      <Header>
        <Title>BEST PRODUCT_All</Title>
      </Header>
      <Grid>
        {allProducts.map((product) => (
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
