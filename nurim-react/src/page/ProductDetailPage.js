import React from "react";
import styled from "styled-components";
import ProductSpecTable from "./components/ProductSpecTable";
import { useParams } from "react-router-dom"; // URL에서 id 가져오기용
import { productRef } from "../data/productRef";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
`;

const ProductDetailPage = () => {
  // 2. URL에서 id 가져오기 (예: /subscriptions/1 이면 id는 "1")
  const { id } = useParams();

  const specs = productRef[id];

  if (!specs) {
    return <div>아직 상세 스펙 정보가 등록되지 않았습니다.</div>;
  }

  return (
    <Container>
      <h2>제품 상세 스펙</h2>

      {/* 4. 찾은 데이터(specs)를 테이블 컴포넌트에 전달 */}
      <ProductSpecTable data={specs} />
    </Container>
  );
};

export default ProductDetailPage;
