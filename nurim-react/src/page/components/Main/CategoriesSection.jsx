import React from "react";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import ac from "../../../img/C_ac.png";
import wt from "../../../img/C_wt.png";
import tv from "../../../img/C_tv.png";
import ref from "../../../img/C_ref.png";
import air from "../../../img/C_air.png";

const Section = styled.section`
  display: flex;
  height: 1531px;
  width: 1440px;
  align-self: center;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--tokens-spacing-spacing-2xl);
  padding-top: var(--tokens-spacing-spacing-sm);
  padding-right: var(--tokens-spacing-spacing-3xl);
  padding-bottom: var(--tokens-spacing-spacing-lg);
  padding-left: var(--tokens-spacing-spacing-3xl);
  background-color: var(--tokens-background-primary);
  margin-bottom: 90px;
`;

const ContentWrapper = styled.div`
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--tokens-spacing-spacing-lg);
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  position: relative;
  flex-wrap: wrap;
`;

const Heading = styled.h2`
  position: relative;
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 600;
  color: var(--tokens-text-heading-main);
  font-size: 1.875rem;
  letter-spacing: 0;
  line-height: normal;
  width: 1280px;
  margin-bottom: 10px;
  margin-left: 80px;
`;

const Row = styled.div`
  width: 1280px;
  align-items: flex-start;
  gap: 50px;
  display: flex;
  position: relative;
  margin-left: 80px;
  margin-right: 80px;
`;

const CenterRow = styled.div`
  width: 1280px;
  align-items: flex-start;
  margin-top: 32px;
  margin-bottom: 32px;
  margin-left: 80px;
`;

const Card = styled.div`
  flex: ${({ $layout }) => ($layout === "half" ? "1" : "none")};
  flex-grow: ${({ $layout }) => ($layout === "half" ? "1" : "0")};
  width: ${({ $layout }) => ($layout === "full" ? "1280px" : "auto")};
  position: relative;
  height: 453px;
  background-color: #f3f4f7;
  border-radius: var(--tokens-radius-radius-minimal);
  overflow: hidden;
`;

const Shadow = styled.div`
  position: absolute;
  top: 391px;
  left: 274px;
  width: 285px;
  height: 12px;
  background-color: #10101033;
  border-radius: 142.5px / 6px;
  filter: blur(20px);
`;

const Content = styled.div`
  top: ${({ $layout }) => ($layout === "full" ? "162px" : "272px")};
  left: ${({ $layout }) => ($layout === "full" ? "107px" : "51px")};
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.75rem; /* gap-7 */
  position: absolute;
  z-index: 10;
`;

const Title = styled.h3`
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 600; /* SemiBold */
  color: var(--tokens-text-heading-main);
  font-size: 1.875rem; /* 3xl */
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
`;

const ShopButton = styled.button`
  height: 3.5rem; /* h-14 */
  gap: 0.75rem; /* gap-3 */
  padding: 0.625rem 1.25rem; /* px-5 py-2.5 */
  border: 1px solid #b3b3b3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: var(--tokens-radius-radius-fully-rounded);
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #e8e9ec;
  }
`;

const ButtonText = styled.span`
  position: relative;
  width: fit-content;
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 600; /* SemiBold */
  color: var(--tokens-text-heading-main);
  font-size: 15px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
`;

const StyledArrowRight = styled(ArrowRight)`
  position: relative !important;
  width: 1.5rem !important; /* w-6 */
  height: 1.5rem !important; /* h-6 */
`;

const ProductImage = styled.img`
  position: absolute;
  ${({ $imageClasses }) => $imageClasses}

  ${(props) =>
    props.$id === 1 &&
    `
    top: 50px;
    left: 336px;
    width: 100px;
    height: 350px;
    aspect-ratio: 0.22;
  `}
   /* Example for id:2 (null image logic handled in render but here just styles) */
  ${(props) =>
    props.$id === 2 &&
    `
     top: 2rem; /* top-8 */
     left: 100px;
     width: 600px;
     height: 390px;
     aspect-ratio: 0.63;
     background-image: url('/image-4.png'); /* Adjust path */
     background-size: cover;
     background-position: 50% 50%;
  `}
   /* Example for id:3 */
  ${(props) =>
    props.$id === 3 &&
    `
    top: -25px;
    left: 528px;
    width: 585px;
    height: 500px;
    aspect-ratio: 1.91;
  `}
  /* Example for id:4 */
  ${(props) =>
    props.$id === 4 &&
    `
    top: 5rem; /* top-20 */
    left: 251px;
    width: 294px;
    height: 294px;
    aspect-ratio: 1;
    object-fit: cover;
  `}
  /* Example for id:5 */
  ${(props) =>
    props.$id === 5 &&
    `
    top: 73px;
    left: 235px;
    width: 330px;
    height: 330px;
    aspect-ratio: 1;
    object-fit: cover;
  `}
`;
// Note: For id 2 which is a div bg image
const ProductImageDiv = styled.div`
  position: absolute;
  ${(props) =>
    props.$id === 2 &&
    `
     top: 2rem; /* top-8 */
     left: 294px;
     width: 246px;
     height: 390px;
     aspect-ratio: 0.63;
     background-image: url('/image-4.png'); 
     background-size: cover;
     background-position: 50% 50%;
  `}
`;

export const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      title: "에어컨",
      image: ac,
      layout: "half",
    },
    {
      id: 2,
      title: "냉장고",
      image: ref,
      layout: "half",
      hasShadow: true,
    },
    {
      id: 3,
      title: "TV",
      image: tv,
      layout: "full",
    },
    {
      id: 4,
      title: "세탁기",
      image: wt,
      layout: "half",
    },
    {
      id: 5,
      title: "공기청정기",
      image: air,
      layout: "half",
    },
  ];

  const renderCategoryCard = (category) => {
    return (
      <Card key={category.id} $layout={category.layout}>
        {category.hasShadow && <Shadow />}

        <Content $layout={category.layout}>
          <Title>{category.title}</Title>
          <ShopButton aria-label={`Shop ${category.title} now`}>
            <ButtonText>Shop Now</ButtonText>
            <StyledArrowRight />
          </ShopButton>
        </Content>

        {category.image ? (
          <ProductImage
            src={category.image}
            alt={category.title}
            $id={category.id}
          />
        ) : (
          <ProductImageDiv
            role="img"
            aria-label={category.title}
            $id={category.id}
          />
        )}
      </Card>
    );
  };

  return (
    <Section aria-labelledby="categories-heading">
      <ContentWrapper>
        <Heading id="categories-heading">Categories</Heading>
        <hr />
        <Row>
          {renderCategoryCard(categories[0])}
          {renderCategoryCard(categories[1])}
        </Row>
        <CenterRow>{renderCategoryCard(categories[2])}</CenterRow>
        <Row>
          {renderCategoryCard(categories[3])}
          {renderCategoryCard(categories[4])}
        </Row>
      </ContentWrapper>
    </Section>
  );
};
