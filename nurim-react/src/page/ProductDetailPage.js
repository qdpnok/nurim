import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductSpecTable from "./components/Sub/ProductSpecTable";
import { allProductSpecs } from "../data/index";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  text-align: center;
`;

const ProductDetailPage = () => {
  // 1. URL에서 category(예: productAc)와 id(예: 1)를 모두 가져옵니다.
  const { category, id } = useParams();

  // 2. 데이터 찾기
  // 먼저 카테고리 이름으로 파일(객체)을 찾고, 그 안에서 ID로 제품을 찾습니다.
  const targetCategoryData = allProductSpecs[category]; // 예: productAc 데이터 전체
  const specs = targetCategoryData ? targetCategoryData[id] : null;

  if (!specs) {
    return (
      <Container>
        <h2>상품 정보를 찾을 수 없습니다.</h2>
        <p>
          카테고리: {category} / ID: {id}
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>제품 상세 스펙</h2>
      <ProductSpecTable data={specs} />
    </Container>
  );
};

export default ProductDetailPage;
