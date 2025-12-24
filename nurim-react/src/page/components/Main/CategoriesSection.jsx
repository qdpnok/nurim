import React from "react";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // [추가] 네비게이션 훅

// ... (이미지 import 기존과 동일)
import ac from "../../../img/C_ac.png";
import wt from "../../../img/C_wt.png";
import tv from "../../../img/C_tv.png";
import ref from "../../../img/C_ref.png";
import air from "../../../img/C_air.png";

// ... (스타일 컴포넌트들 - Section, ContentWrapper 등 기존과 동일, 생략 없이 전체 코드에 포함됨)

const Section = styled.section`
  display: flex;
  width: 100%;
  max-width: 1440px;
  padding: 60px 20px;
  flex-direction: column;
  align-items: center;
  background-color: var(--tokens-background-primary);
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Heading = styled.h2`
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 600;
  color: var(--tokens-text-heading-main);
  font-size: 1.875rem;
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
`;

const Card = styled.div`
  position: relative;
  background-color: #f3f4f7;
  border-radius: var(--tokens-radius-radius-minimal);
  overflow: hidden;
  height: 450px;
  flex: 1 1 45%;
  min-width: 300px;

  /* ▼▼▼ [추가] 텍스트 선택 및 커서 깜빡임 방지 ▼▼▼ */
  user-select: none; /* 텍스트 선택 막기 */
  -webkit-user-select: none; /* 크롬/사파리 호환 */
  -moz-user-select: none; /* 파이어폭스 호환 */
  -ms-user-select: none; /* IE/엣지 호환 */

  /* 이미지를 드래그해서 파란색으로 선택되는 것도 막고 싶다면 추가 */
  & > img {
    -webkit-user-drag: none;
  }

  ${({ $layout }) =>
    $layout === "full" &&
    `
    flex-basis: 100%;
  `}

  @media (max-width: 768px) {
    flex-basis: 100%;
    height: auto;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const Title = styled.h3`
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 600;
  font-size: 1.875rem;
  margin: 0;
`;

const ShopButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border: 1px solid #b3b3b3;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;
  width: fit-content;

  &:hover {
    background-color: #e8e9ec;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    gap: 6px;
  }
`;

const ButtonText = styled.span`
  font-family: "Inter", Helvetica, sans-serif;
  font-weight: 600;
  font-size: 15px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ProductImage = styled.img`
  position: absolute;
  object-fit: contain;

  /* 1. 에어컨 (id: 1) */
  ${(props) =>
    props.$id === 1 &&
    `
    bottom: 20px;
    right: 50%;
    transform: translateX(50%);
    height: 80%;
    max-width: 60%;
  `}

  /* 2. 냉장고 (id: 2) */
  ${(props) =>
    props.$id === 2 &&
    `
    bottom: 20px;
    right: 30px;
    height: 90%;
    max-width: 65%;
  `}

  /* 3. 세탁기 (id: 4), 공기청정기 (id: 5) */
  ${(props) =>
    (props.$id === 4 || props.$id === 5) &&
    `
    bottom: 20px;
    right: 40px;
    height: 80%;
    max-width: 50%;
  `}

  /* 4. TV (id: 3) */
  ${(props) =>
    props.$id === 3 &&
    `
      bottom: 50%;
      right: 20px;
      transform: translateY(50%);
      height: auto;
      width: 70%;
      max-height: 95%;
  `}
  
  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    right: auto;
    transform: none;

    width: auto;
    height: 250px;
    max-width: 90%;

    margin: 0 auto 20px auto;
    display: block;

    ${(props) =>
      props.$id === 3 &&
      `
        width: 90%;
        height: auto;
        max-height: 250px;
     `}
  }
`;

export const CategoriesSection = () => {
  const navigate = useNavigate(); // [추가] Hook 사용

  const categories = [
    { id: 1, title: "에어컨", image: ac, layout: "half" },
    { id: 2, title: "냉장고", image: ref, layout: "half" },
    { id: 3, title: "TV", image: tv, layout: "full" },
    { id: 4, title: "세탁기", image: wt, layout: "half" },
    { id: 5, title: "공기청정기", image: air, layout: "half" },
  ];

  // [추가] 클릭 핸들러: Purchase 페이지로 이동하며 state 전달
  const handleCategoryClick = (categoryTitle) => {
    navigate("/purchase", { state: { category: categoryTitle } });
  };

  return (
    <Section aria-labelledby="categories-heading">
      <ContentWrapper>
        <Heading id="categories-heading">Categories</Heading>
        <Grid>
          {categories.map((cat) => (
            <Card key={cat.id} $layout={cat.layout}>
              <Content>
                <Title>{cat.title}</Title>
                {/* [수정] onClick 이벤트 연결 */}
                <ShopButton onClick={() => handleCategoryClick(cat.title)}>
                  <ButtonText>Shop Now</ButtonText>
                  <ArrowRight size={window.innerWidth <= 768 ? 16 : 20} />
                </ShopButton>
              </Content>
              <ProductImage src={cat.image} alt={cat.title} $id={cat.id} />
            </Card>
          ))}
        </Grid>
      </ContentWrapper>
    </Section>
  );
};
