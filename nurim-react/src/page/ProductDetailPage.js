import React from "react";
import styled from "styled-components";
import ProductSpecTable from "./components/ProductSpecTable"; // 위에서 만든 컴포넌트

import { LGStandByMe } from "../data/productSpecs";

const ProductDetailPage = () => {
  return (
    <PageContainer>
      <h2>제품 상세 스펙</h2>
      <ProductSpecTable data={LGStandByMe} />
    </PageContainer>
  );
};

export default ProductDetailPage;

const PageContainer = styled.div`
  width: 1000px; // 혹은 1200px
  margin: 0 auto;
  padding: 50px 0;
`;
