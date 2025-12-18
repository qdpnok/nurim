import React from "react";
import styled from "styled-components";
const acLg011 = "https://placehold.co/100x443";
const airDy011 = "https://placehold.co/100x443";
const image1 = "https://placehold.co/100x443";
const refSam021 = "https://placehold.co/100x443";
const tvLg011 = "https://placehold.co/100x443";
const tvSam031 = "https://placehold.co/100x443";

// import acLg011 from "./ac-lg-01-1.png";
// import airDy011 from "./air-dy-01-1.png";
// import image1 from "./image-1.png";
// import refSam021 from "./ref-sam-02-1.png";
// import tvLg011 from "./tv-lg-01-1.png";
// import tvSam031 from "./tv-sam-03-1.png";

const Section = styled.section`
  margin-left: 5rem; /* ml-20 */
  margin-right: 5rem;
  flex: 1;
  max-height: 786.57px;

  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  /* margin-left: 27.3px; */
  margin-right: 46.9px;
  flex: 1;
  max-height: 3.5rem; /* h-14 */
  position: relative;
  width: 1205.75px;
  height: 3.5rem;
  align-items: center;
  gap: 0.625rem; /* gap-2.5 */
  padding: 0.625rem 0;
`;

const Title = styled.h2`
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Poppins", Helvetica, sans-serif;
  font-weight: 600; /* SemiBold */
  color: black;
  font-size: 1.5rem; /* 2xl */
  letter-spacing: 0;
  line-height: normal;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  max-height: 339.91px;
  position: relative;
  width: ${({ $isRow1 }) => ($isRow1 ? "1277.47px" : "1280px")};
  height: 339.91px;
  align-items: center;
  justify-content: center;
  gap: 200px;
  padding: 0 1.25rem; /* px-5 */
  margin-top: ${({ $isRow1 }) => ($isRow1 ? "40.7px" : "10.1px")};
  margin-right: ${({ $isRow1 }) => ($isRow1 ? "2.5px" : "0")};
`;

const Article = styled.article`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0.625rem; /* p-2.5 */
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

const ProductName = styled.h3`
  position: relative;
  width: 236px;
  font-family: ${({ $fontFamily }) =>
    $fontFamily.includes("Poppins")
      ? "'Poppins', Helvetica, sans-serif"
      : "'Outfit', Helvetica, sans-serif"};
  font-weight: ${({ $fontFamily }) =>
    $fontFamily.includes("medium") ? "500" : "400"};
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

export const PromotionsSection = () => {
  const productsRow1 = [
    {
      id: 1,
      image: tvLg011,
      alt: "Tv lg",
      name: "LG전자 스탠바이미 27ART10AKPL",
      price: "1,150,000won",
      discount: "-10% off",
      fontFamily: "[font-family:'Outfit-Regular',Helvetica]",
    },
    {
      id: 2,
      image: image1,
      alt: "Image",
      name: "삼성전자 더 세리프 55인치_KQ55LST01BFXKR",
      price: "1,450,000won",
      discount: "-36% off",
      fontFamily: "[font-family:'Poppins-Medium',Helvetica] font-medium",
    },
    {
      id: 3,
      image: acLg011,
      alt: "Ac lg",
      name: "LG전자 오브제컬렉션 휘센 위너\n스탠드에어컨_FQ17HDWHC1",
      price: "1,492,000won",
      discount: "-10% off",
      fontFamily: "[font-family:'Poppins-Regular',Helvetica]",
    },
  ];

  const productsRow2 = [
    {
      id: 4,
      image: tvSam031,
      alt: "Tv sam",
      name: "삼성전자 더 세로 QLED TV\nKQ43LST05BFXKR",
      price: "1,450,000won",
      discount: "-16% off",
      fontFamily: "[font-family:'Poppins-Medium',Helvetica] font-medium",
    },
    {
      id: 5,
      image: airDy011,
      alt: "Air dy",
      name: "다이슨 쿨 공기청정기\nTP07",
      price: "494,000won",
      discount: "-13% off",
      fontFamily: "[font-family:'Poppins-Medium',Helvetica] font-medium",
    },
    {
      id: 6,
      image: refSam021,
      alt: "Ref sam",
      name: "삼성전자 양문형냉장고_RS84T5081SA",
      price: "1,500,000won",
      discount: "-34% off",
      fontFamily: "[font-family:'Poppins-Regular',Helvetica]",
    },
  ];

  const renderProductCard = (product) => {
    const nameLines = product.name.split("\n");

    return (
      <Article key={product.id}>
        <ProductImage src={product.image} alt={product.alt} />
        <ProductName $fontFamily={product.fontFamily}>
          {nameLines.length > 1 ? (
            <>
              {nameLines[0]}
              <br />
              {nameLines[1]}
            </>
          ) : (
            product.name
          )}
        </ProductName>
        <InfoRow>
          <Price>{product.price}</Price>
          <Discount>{product.discount}</Discount>
        </InfoRow>
      </Article>
    );
  };

  return (
    <Section>
      <Header>
        <Title>BEST PRODUCT_All</Title>
      </Header>
      <Row $isRow1={true}>{productsRow1.map(renderProductCard)}</Row>
      <Row $isRow1={false}>{productsRow2.map(renderProductCard)}</Row>
    </Section>
  );
};
