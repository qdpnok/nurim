import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // axios 추가
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

const CATEGORIES = [
  { name: "에어컨", img: ac },
  { name: "냉장고", img: ref },
  { name: "TV", img: tv },
  { name: "세탁기", img: wash },
  { name: "공기청정기", img: air },
];

// --- 메인 컴포넌트 ---
const SubscribePage = ({ type }) => {
  const [selectedCategory, setSelectedCategory] = useState("에어컨");

  // [수정 2] DB 데이터를 저장할 State 생성
  const [products, setProducts] = useState([]); // 초기값은 빈 배열
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const fetchProducts = async () => {
    try {
      setError(null);
      setProducts([]);
      setLoading(true);

      // 1. 서버 요청
      const response = await axios.get(
        `http://localhost:8222/api/product/list?category=${selectedCategory}&page=${currentPage}`
      );

      const mappedData = response.data.productListDtoList.map((item) => ({
        id: type === "subscription" ? item.sNum : item.pNum,
        category: item.category,
        image: item.img,
        alt: item.name,
        name: item.name,
        price: `${item.price.toLocaleString()}won`,
        discount: item.pDiscountRate ? `-${item.pDiscountRate}% off` : null,
        spec: item.spec,
        reviewCount: item.scopeCount,
        rating: item.scopeAvg,
      }));

      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);

      // 3. 변환된 데이터를 state에 저장
      setProducts(mappedData);
    } catch (e) {
      console.error("Error fetching data:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // [수정 3] 서버에서 데이터 가져오기 (useEffect)
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 로딩 중이거나 에러 발생 시 처리
  if (loading)
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
      </Container>
    );

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
          {/* type에 따라 상단 텍스트 변경 */}
          <span>
            {type === "subscription" ? "Subscriptions" : "Purchase"}
          </span>{" "}
          <span>&gt;</span>
          <span className="active">{selectedCategory}</span>
        </Breadcrumb>
      </ContentHeader>

      <LineSeparator />

      <PageTitle>{selectedCategory} Products</PageTitle>

      {/* 2. 상품 리스트 영역 */}
      <ProductGrid>
        {products.length > 0 ? (
          products.map((data) => (
            <ProductItem key={data.id} product={data} type={type} />
          ))
        ) : (
          <EmptyMessage>해당 카테고리에 등록된 상품이 없습니다.</EmptyMessage>
        )}
      </ProductGrid>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default SubscribePage;
