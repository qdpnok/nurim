import React from "react";
import styled from "styled-components";
const acLg021 = "https://placehold.co/100x443";
const image12 = "https://placehold.co/100x443";
const refSam0212 = "https://placehold.co/100x443";
const washLg051 = "https://placehold.co/100x443";

const Section = styled.section`
  margin-top: 90px;
  display: flex;
  margin-left: 5rem; /* ml-20 */
  width: 1280px;
  height: 434px;
  position: relative;
  margin-top: 73px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const Header = styled.header`
  display: flex;
  margin-right: 46.9px;
  flex: 1;
  max-height: 3.5rem; /* h-14 */
  position: relative;
  width: 1280px;
  height: 3.5rem;
  align-items: center;
  gap: 0.625rem; /* gap-2.5 */
  padding: 0.625rem 0;
  margin-top: 90px;
`;

const Title = styled.h2`
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 600; /* SemiBold */
  color: black;
  font-size: 1.5rem;
  letter-spacing: 0;
  line-height: normal;
  width: 1280px;
`;

const Article = styled.article`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem; /* gap-2.5 */
  padding: 15px;
  position: relative;
  flex: 0 0 auto;
  border-radius: 10px;
`;

const ProductImage = styled.img`
  position: relative;
  width: 235px;
  height: 235px;
  aspect-ratio: 1;
  object-fit: cover;
`;

const ProductName = styled.p`
  position: relative;
  width: 236px;
  font-family: ${({ $id }) =>
    $id === 3
      ? "'Poppins', Helvetica, sans-serif"
      : "'Poppins', Helvetica, sans-serif"};
  font-weight: ${({ $fontWeight }) =>
    $fontWeight === "font-medium" ? "500" : "400"};
  color: black;
  font-size: 1rem; /* text-base */
  letter-spacing: 0;
  line-height: normal;
`;

const InfoRow = styled.div`
  display: flex;
  width: 235px;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  flex: 0 0 auto;
`;

const Price = styled.div`
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 400; /* Regular */
  color: black;
  font-size: 1rem; /* text-base */
  letter-spacing: 0;
  line-height: normal;
`;

const Discount = styled.div`
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 400; /* Regular */
  color: #ff3232;
  font-size: 1rem; /* text-base */
  letter-spacing: 0;
  line-height: normal;
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
      fontWeight: "font-normal",
    },
    {
      id: 2,
      image: refSam0212,
      alt: "Ref sam",
      name: "삼성전자 양문형냉장고_RS84T5081SA",
      price: "1,500,000won",
      discount: "-34% off",
      fontWeight: "font-normal",
    },
    {
      id: 3,
      image: image12,
      alt: "Image",
      name: "삼성전자 더 세리프 55인치_KQ55LST01BFXKR",
      price: "1,450,000won",
      discount: "-36% off",
      fontWeight: "font-medium",
    },
    {
      id: 4,
      image: acLg021,
      alt: "Ac lg",
      name: "LG전자 오브제컬렉션 휘센 듀얼 히트_FQ18HDDHA1",
      price: "2,430,000won",
      discount: "-30% off",
      fontWeight: "font-normal",
    },
  ];

  return (
    <Section>
      <Header>
        <Title>Today’s hot deals</Title>
      </Header>
      {products.map((product) => (
        <Article key={product.id}>
          <ProductImage src={product.image} alt={product.alt} />
          <ProductName $id={product.id} $fontWeight={product.fontWeight}>
            {product.name}
          </ProductName>

          <InfoRow>
            <Price>{product.price}</Price>
            <Discount>{product.discount}</Discount>
          </InfoRow>
        </Article>
      ))}
    </Section>
  );
};
