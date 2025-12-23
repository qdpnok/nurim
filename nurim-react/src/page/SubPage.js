import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// 컴포넌트 import
import CategoryFilter from "./components/Sub/CategoryFilter";
import ProductItem from "./components/Sub/ProductItem";
import Pagination from "./components/Sub/Pagination";

// 이미지 import (경로 확인 필요)
import ac from "../img/C_ac.png";
import ref from "../img/C_ref.png";
import tv from "../img/C_tv.png";
import wash from "../img/C_wt.png";
import air from "../img/C_air.png";

const CATEGORIES = [
  { name: "에어컨", img: ac },
  { name: "냉장고", img: ref },
  { name: "TV", img: tv },
  { name: "세탁기", img: wash },
  { name: "공기청정기", img: air },
];

const SubPage = ({ type }) => {
  // 데이터 확인이 가장 잘 되는 'TV'를 기본값으로 설정
  const [selectedCategory, setSelectedCategory] = useState("TV");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // [수정] DB의 snum(숫자) -> 카테고리명 변환
  const getCategoryName = (snum) => {
    if (snum === 1 || snum === 6) return "TV";
    if (snum === 2 || snum === 7) return "냉장고";
    if (snum === 3 || snum === 8) return "세탁기";
    if (snum === 4 || snum === 9) return "에어컨";
    if (snum === 5 || snum === 10) return "공기청정기";
    return "기타";
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        setProducts([]);
        setLoading(true);

        // 0~4페이지 (총 100개 데이터) 요청 준비
        const pages = [0, 1, 2, 3, 4];

        const requests = pages.map((page) =>
          axios.get("http://localhost:8222/api/product/list", {
            params: {
              page: page,
              size: 20, // 페이지당 20개씩 안전하게 요청
            },
          })
        );

        // [핵심 해결책] Promise.all 대신 allSettled 사용!
        // 500 에러가 난 요청은 무시하고, 성공한 요청의 데이터만 가져옵니다.
        const results = await Promise.allSettled(requests);

        // 성공한 응답(fulfilled)들만 추려내서 데이터 합치기
        const allProductList = results
          .filter((result) => result.status === "fulfilled") // 성공한 것만 통과
          .flatMap((result) => result.value.data || []); // 데이터 꺼내기

        console.log(
          "🔥 (성공한 요청만) 확보한 데이터 개수:",
          allProductList.length
        );

        if (allProductList.length === 0) {
          console.warn("모든 요청이 실패했거나 데이터가 없습니다.");
        }

        // 1. 데이터 매핑
        const mappedData = allProductList.map((item) => {
          const targetDiscount =
            type === "subscription" ? item.sdiscountRate : item.pdiscountrate;

          return {
            id: item.pnum,
            snum: item.snum,
            category: getCategoryName(item.snum),
            image: item.img,
            alt: item.name,
            name: item.name,
            price: item.price ? `${item.price.toLocaleString()}won` : "0won",
            discount: targetDiscount ? `-${targetDiscount}% off` : null,
            spec: item.spec,
            reviewCount: item.scopeCount || 0,
            rating: item.scopeAvg || 0,
          };
        });

        // 2. 중복 제거 (혹시 모를 중복 방지)
        const uniqueData = mappedData.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );

        // 3. 페이지 타입(구독/구매)에 따라 ID 범위로 필터링
        const filteredByType = uniqueData.filter((product) => {
          // 구독 페이지: ID 1 ~ 50
          if (type === "subscription") {
            return product.id <= 50;
          }
          // 구매 페이지: ID 51 이상
          else {
            return product.id >= 51;
          }
        });

        console.log(`✅ [${type}] 최종 필터링된 데이터:`, filteredByType);

        setProducts(filteredByType);
      } catch (e) {
        // allSettled를 쓰면 여기로 오는 에러는 거의 없지만, 혹시 모르니 남겨둡니다.
        console.error("❌ 치명적 에러:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type]); // 페이지 타입이 바뀔 때 재실행

  // 4. 화면 표시용 카테고리 필터링
  const filteredProducts =
    selectedCategory === "전체"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) return <Container>Loading...</Container>;
  // 에러가 있어도 성공한 데이터는 보여줘야 하므로 에러 화면 리턴은 생략하거나 조건부로 처리

  return (
    <Container>
      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryClick}
      />

      {/* 검색창 등 나머지 UI 코드 유지 */}
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
          <span>
            {type === "subscription" ? "Subscriptions" : "Purchase"}
          </span>{" "}
          <span>&gt;</span>
          <span className="active">{selectedCategory}</span>
        </Breadcrumb>
      </ContentHeader>

      <LineSeparator />

      <PageTitle>{selectedCategory} Products</PageTitle>

      <ProductGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((data) => (
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

export default SubPage;

// --- 스타일 컴포넌트 ---
const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
