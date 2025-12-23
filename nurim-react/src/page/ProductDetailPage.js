// src/page/ProductDetailPage.js

import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductSpecTable from "./components/Sub/ProductSpecTable"; // 경로 확인

// [중요] 1단계에서 만든 통합 데이터 가져오기
import { allProductSpecs } from "../data/index";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductDetailPage = () => {
  // 1. URL 파라미터 추출
  // 예: /subscriptions/productTv/1  => category="productTv", id="1"
  const { category, id } = useParams();

  // 2. 데이터 찾기
  // allProductSpecs["productTv"] 를 통해 productTvSpecs 데이터를 가져옵니다.
  const targetCategoryData = allProductSpecs[category];

  // 가져온 카테고리 데이터 안에서 ID가 1인 제품을 찾습니다.
  const specs = targetCategoryData ? targetCategoryData[id] : null;

  // 데이터가 없을 경우 처리
  if (!specs) {
    return (
      <Container>
        <h2>상품 정보를 찾을 수 없습니다.</h2>
        <p>
          요청하신 카테고리({category})의 상품 ID({id})가 존재하지 않습니다.
        </p>
      </Container>
    );
  }

  // 3. 데이터가 있으면 스펙 테이블 출력
  return (
    <Container>
      {/* 필요하다면 여기에 상품 이미지나 이름을 추가로 보여줄 수 있습니다 */}
      {/* <h1>상품 상세 정보</h1> */}

      {/* 스펙 테이블 컴포넌트에 데이터 전달 */}
      <ProductSpecTable data={specs} />
    </Container>
  );
};

export default ProductDetailPage;
