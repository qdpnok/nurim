import React from "react";
import styled from "styled-components";
import {
  PageTitle,
  DashboardGrid,
  StatCardBox,
  TableContainer,
  StyledTable,
} from "../../styles/AdminStyles";
import { memberStats, withdrawnMembers } from "../../data/adminData";
import {
  FaUserFriends,
  FaCreditCard,
  FaShoppingBag,
  FaUserSlash,
} from "react-icons/fa";

const AdminWithdrawal = () => {
  // 아이콘 매핑
  const getIcon = (type) => {
    switch (type) {
      case "users":
        return <FaUserFriends />;
      case "subscription":
        return <FaCreditCard />;
      case "purchase":
        return <FaShoppingBag />;
      case "withdrawal":
        return <FaUserSlash />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageTitle>회원 탈퇴 관리</PageTitle>

      {/* 상단 통계 카드 (대시보드 스타일 재사용) */}
      <DashboardGrid>
        {memberStats.map((stat) => (
          <StatCardBox key={stat.id}>
            <div className="header">
              {stat.title}
              {getIcon(stat.icon)}
            </div>
            <div className="count">{stat.count}</div>
            <div className={`trend ${stat.trendType}`}>
              {stat.trend} 전월 대비
            </div>
          </StatCardBox>
        ))}
      </DashboardGrid>

      {/* 탈퇴 회원 리스트 테이블 */}
      <TableContainer>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ margin: 0 }}>탈퇴 요청 내역</h3>
          <SearchInput placeholder="Search User Here" />
        </div>

        <StyledTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>권한</th>
              <th>삭제대기 여부</th>
              <th>탈퇴일</th>
            </tr>
          </thead>
          <tbody>
            {withdrawnMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.userId}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>{member.deleteWait}</td>
                <td>{member.date}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

        {/* 페이지네이션 */}
        <Pagination>
          <span>Items per page: 10</span>
          <div className="arrows">
            <span>1 - 5 of 136</span>
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </Pagination>
      </TableContainer>
    </>
  );
};

export default AdminWithdrawal;

// 스타일 추가 (검색창 등)
const SearchInput = styled.input`
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #f9f9f9;
  width: 250px;
  outline: none;
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
