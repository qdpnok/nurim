import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  PageTitle,
  TableContainer,
  StyledTable,
} from "../../styles/AdminStyles";
import { productList } from "../../data/adminData";

const AdminProductList = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>상품 등록 관리</PageTitle>

      {/* 검색 필터 영역 */}
      <FilterBox>
        <div className="row">
          <div className="input-group">
            <label>브랜드명 검색</label>
            <input type="text" placeholder="브랜드명을 입력하세요" />
          </div>
          <div className="input-group">
            <label>카테고리별</label>
            <select>
              <option>대분류 선택</option>
            </select>
            <select>
              <option>소분류 선택</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-group">
            <label>상품명 검색</label>
            <input
              type="text"
              placeholder="상품명을 입력하세요"
              style={{ width: "300px" }}
            />
          </div>
          <div className="input-group checkbox-group">
            <label>진열 상태</label>
            <label>
              <input type="checkbox" defaultChecked /> 전체
            </label>
            <label>
              <input type="checkbox" /> 판매
            </label>
            <label>
              <input type="checkbox" /> 품절
            </label>
            <label>
              <input type="checkbox" /> 숨김
            </label>
          </div>
          <div className="action-group">
            <button className="reset">초기화</button>
            <button className="search">검색</button>
          </div>
        </div>
      </FilterBox>

      {/* 상태 변경 버튼 그룹 */}
      <ControlBar>
        <div className="left-btns">
          <button>정상</button>
          <button>준비중</button>
          <button>숨김</button>
          <button>단종예정</button>
          <button className="delete">삭제</button>
        </div>
        <div className="right-opts">
          <label>
            <input type="checkbox" /> 할인 적용 상품보기
          </label>
          <select>
            <option>최신 등록순</option>
          </select>
        </div>
      </ControlBar>

      {/* 상품 리스트 테이블 */}
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>No.</th>
              <th>상품코드</th>
              <th>상품명</th>
              <th>브랜드명</th>
              <th>카테고리</th>
              <th>최종 공급단가</th>
              <th>합계단가</th>
              <th>할인판매가</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{product.id}</td>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.supplyPrice}</td>
                <td>{product.totalPrice}</td>
                <td>{product.discountPrice}</td>
                <td>
                  <ManageBtn>수정</ManageBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

        {/* 하단 페이지네이션 및 상품 추가 버튼 */}
        <BottomBar>
          <div className="pagination">
            <button>&lt;</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>&gt;</button>
          </div>
          <AddButton onClick={() => navigate("/admin/products/register")}>
            상품 추가
          </AddButton>
        </BottomBar>
      </TableContainer>
    </>
  );
};

export default AdminProductList;

// --- 스타일 ---
const FilterBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #eee;

  .row {
    display: flex;
    gap: 30px;
    margin-bottom: 15px;
    align-items: center;
  }
  .input-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .input-group label {
    font-weight: bold;
    font-size: 14px;
    width: 80px;
  }
  .input-group input[type="text"],
  .input-group select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .checkbox-group {
    gap: 15px;
    label {
      width: auto;
      font-weight: normal;
    }
  }

  .action-group {
    margin-left: auto;
    display: flex;
    gap: 10px;
  }
  .action-group button {
    padding: 8px 20px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #ddd;
    background: white;
  }
  .action-group .search {
    background: #375a55;
    color: white;
    border: none;
  }
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
  .left-btns button {
    margin-right: 5px;
    padding: 6px 12px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  .left-btns .delete {
    color: red;
  }
  .right-opts {
    display: flex;
    gap: 15px;
    align-items: center;
    font-size: 14px;
  }
`;

const ManageBtn = styled.button`
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .pagination {
    display: flex;
    gap: 5px;
  }
  .pagination button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
  }
  .pagination button.active {
    background: #375a55;
    color: white;
    border-color: #375a55;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background: #375a55;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;
