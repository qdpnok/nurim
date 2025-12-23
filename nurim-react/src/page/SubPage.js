import React, { useState } from "react";
import styled from "styled-components";
// 컴포넌트
import CategoryFilter from "./components/Sub/CategoryFilter";
import ProductItem from "./components/Sub/ProductItem";
import Pagination from "./components/Sub/Pagination";
// 이미지
import ac from "../img/C_ac.png";
import ref from "../img/C_ref.png";
import tv from "../img/C_tv.png";
import wash from "../img/C_wt.png";
import air from "../img/C_air.png";

const tvimg = "https://placehold.co/256x256";

const CATEGORIES = [
  { name: "에어컨", img: ac },
  { name: "냉장고", img: ref },
  { name: "TV", img: tv },
  { name: "세탁기", img: wash },
  { name: "공기청정기", img: air },
];

const productData = [
  {
    id: 1,
    category: "TV",
    image: tvimg,
    alt: "LG 스탠바이미",
    name: "LG전자 스탠바이미 |\n27ART10AKPL",
    price: "1,150,000won",
    discount: "-10% off",
    spec: "해상도QHD | 인공지능 프로세서알파8 AI | 주요 기능\n돌비 애트모스,돌비 비전 | 운영체제webOS 24",
    reviewCount: 324,
    rating: 5,
  },
  {
    id: 2,
    category: "냉장고",
    image: tvimg,
    alt: "삼성 냉장고",
    name: "삼성전자 양문형냉장고_RS84T5081SA",
    price: "1,500,000won",
    discount: "-34% off",
    spec: "용량 846L | 푸드쇼케이스 | 메탈쿨링",
    reviewCount: 120,
    rating: 5,
  },
].concat(
  Array.from({ length: 7 }).map((_, i) => ({
    id: i + 3,
    category: "TV",
    image: tvimg,
    alt: "삼성 더 세리프",
    name: "삼성전자 더 세리프 55인치",
    price: "1,450,000won",
    discount: "-36% off",
    spec: "해상도 4K QLED | 매직스크린",
    reviewCount: 50,
    rating: 5,
  }))
);

// --- 메인 컴포넌트 ---
const SubscribePage = ({ type }) => {
  const [selectedCategory, setSelectedCategory] = useState("에어컨");

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const filteredProducts =
    selectedCategory === "전체"
      ? productData
      : productData.filter((product) => product.category === selectedCategory);

  return (
    <Container>
      {/* 1. 카테고리 필터 컴포넌트 */}
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryClick}
      />

      <SearchBox>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "10px" }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Search Product Here
      </SearchBox>

      <ContentHeader>
        <Breadcrumb>
          <span>Home</span> <span>&gt;</span>
          <span>Subscriptions</span> <span>&gt;</span>
          <span className="active">{selectedCategory}</span>
        </Breadcrumb>
      </ContentHeader>

      <LineSeparator />

      <PageTitle>{selectedCategory} Products</PageTitle>

      {/* 2. 상품 리스트 영역 */}
      <ProductGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((data) => (
            // [수정 2] 자식 컴포넌트(ProductItem)에게 type을 그대로 전달합니다.
            <ProductItem key={data.id} product={data} type={type} />
          ))
        ) : (
          <EmptyMessage>해당 카테고리에 등록된 상품이 없습니다.</EmptyMessage>
        )}
      </ProductGrid>

      <Pagination />
    </Container>
  );
};

export default SubscribePage;

// --- 페이지 레이아웃용 스타일 ---
const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 기존 SectionContainer.products 역할을 대체
const ProductGrid = styled.div`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  margin-bottom: 50px;
`;

const SearchBox = styled.div`
  width: 1200px;
  height: 90px;
  background-color: #f3f3f5;
  border-radius: 10px;
  margin: 60px 0;
  display: flex;
  align-items: center;
  padding-left: 30px;
  box-sizing: border-box;
  color: #999;
  font-size: 16px;
`;

const ContentHeader = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  display: flex;
  gap: 8px;

  span.active {
    color: #333;
    font-weight: bold;
  }
`;

const PageTitle = styled.h2`
  width: 1200px;
  font-size: 28px;
  font-weight: 800;
  color: #000;
  margin: 30px 0;
  text-align: left;
`;

const LineSeparator = styled.div`
  width: 1200px;
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 0px;
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: 50px;
  text-align: center;
  color: #888;
`;
