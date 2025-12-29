import React from "react";
import styled from "styled-components";
import {
  PageTitle,
  TableContainer,
  StyledTable,
} from "../../styles/AdminStyles";
import { orderList } from "../../data/adminData";

const AdminOrderList = () => {
  return (
    <>
      <PageTitle>주문 내역</PageTitle>

      {/* 검색 필터 */}
      <SearchBox>
        <div className="top-row">
          <input type="text" placeholder="제품번호" className="main-search" />
          <button className="search-btn">검색</button>
        </div>
        <div className="bottom-row">
          <input type="date" />
          <input type="text" placeholder="구매유형" />
          <input type="text" placeholder="주문자" />
          <input type="date" placeholder="배송일" />
          <button className="filter-btn">필터</button>
        </div>
      </SearchBox>

      {/* 주문 리스트 */}
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>주문일자</th>
              <th>제품번호</th>
              <th>구매유형</th>
              <th>주문자</th>
              <th>주소</th>
              <th>배송일</th>
              <th>수량</th>
              <th>주문상태</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.id}>
                <td>
                  <span
                    style={{
                      color: "#2962ff",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {order.date}
                  </span>
                </td>
                <td>{order.productCode}</td>
                <td>{order.type}</td>
                <td>{order.orderer}</td>
                <td
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {order.address}
                </td>
                <td>{order.deliveryDate}</td>
                <td>{order.qty}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

        {/* 페이지네이션 */}
        <Pagination>
          <button>&lt; Previous</button>
          <div className="pages">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>10</button>
          </div>
          <button>Next &gt;</button>
        </Pagination>
      </TableContainer>
    </>
  );
};

export default AdminOrderList;

// --- 스타일 ---
const SearchBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);

  .top-row {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  .main-search {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .search-btn {
    padding: 10px 25px;
    background: #375a55;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .bottom-row {
    display: flex;
    gap: 10px;
  }
  .bottom-row input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .filter-btn {
    padding: 10px 20px;
    background: #888;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 4px;
    cursor: pointer;
  }
  .pages {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .pages button {
    border: none;
  }
  .pages button.active {
    background: #eee;
    font-weight: bold;
    border-radius: 4px;
  }
`;
