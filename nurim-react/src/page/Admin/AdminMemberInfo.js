import React, { useState } from "react";
import styled from "styled-components";
import {
  PageTitle,
  TableContainer,
  StyledTable,
} from "../../styles/AdminStyles";
import { memberList } from "../../data/adminData";

const AdminMemberInfo = () => {
  const [search, setSearch] = useState({
    id: "",
    name: "",
    role: "전체",
    status: "전체",
  });

  // 검색 핸들러
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  // 초기화 핸들러
  const handleReset = () => {
    setSearch({ id: "", name: "", role: "전체", status: "전체" });
  };

  // 삭제 핸들러 (기능 예시)
  const handleDelete = (id) => {
    if (window.confirm("정말 이 회원을 삭제하시겠습니까?")) {
      alert(`회원 ID ${id} 삭제 처리가 완료되었습니다.`);
      // 실제로는 여기서 API 호출
    }
  };

  return (
    <>
      <PageTitle>회원 정보 조회</PageTitle>

      {/* 검색 필터 영역 */}
      <FilterContainer>
        <div className="filter-row">
          <div className="filter-group">
            <label>유저 아이디</label>
            <input
              type="text"
              name="id"
              value={search.id}
              onChange={handleSearchChange}
              placeholder="아이디 입력"
            />
          </div>
          <div className="filter-group">
            <label>회원명</label>
            <input
              type="text"
              name="name"
              value={search.name}
              onChange={handleSearchChange}
              placeholder="회원명 입력"
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label>유저권한</label>
            <select
              name="role"
              value={search.role}
              onChange={handleSearchChange}
            >
              <option value="전체">전체</option>
              <option value="일반 회원">일반 회원</option>
              <option value="구독 회원">구독 회원</option>
              <option value="구매 회원">구매 회원</option>
            </select>
          </div>
          <div className="filter-group">
            <label>삭제대기 여부</label>
            <select
              name="status"
              value={search.status}
              onChange={handleSearchChange}
            >
              <option value="전체">전체</option>
              <option value="Y">Y</option>
              <option value="N">N</option>
            </select>
          </div>
        </div>
        <div className="btn-group">
          <button className="search-btn">검색</button>
          <button className="reset-btn" onClick={handleReset}>
            초기화
          </button>
        </div>
      </FilterContainer>

      {/* 회원 리스트 테이블 */}
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>권한</th>
              <th>삭제대기 여부</th>
              <th>유저삭제</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.userId}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>{member.deleteWait}</td>
                <td>
                  <DeleteButton onClick={() => handleDelete(member.id)}>
                    삭제
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

        {/* 페이지네이션 (디자인용) */}
        <Pagination>
          <span>Items per page: 10</span>
          <div className="arrows">
            <span>1 - 10 of 209</span>
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </Pagination>
      </TableContainer>
    </>
  );
};

export default AdminMemberInfo;

// --- 스타일 컴포넌트 ---
const FilterContainer = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;

  .filter-row {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
  }

  .filter-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 13px;
      font-weight: bold;
      color: #555;
    }

    input,
    select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      &::placeholder {
        color: #ccc;
      }
    }
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      padding: 10px 25px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      border: none;
    }

    .search-btn {
      background: #375a55;
      color: white;
    }
    .reset-btn {
      background: #888;
      color: white;
    }
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  color: #888;
  border: 1px solid #ddd;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: #ffebee;
    color: #c62828;
    border-color: #c62828;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 20px;
  font-size: 13px;
  color: #666;
  gap: 20px;

  .arrows {
    display: flex;
    align-items: center;
    gap: 15px;
    button {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 16px;
    }
  }
`;
