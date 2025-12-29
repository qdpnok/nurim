import React from "react";
import styled from "styled-components";
import {
  PageTitle,
  TableContainer,
  StyledTable,
} from "../../styles/AdminStyles";
import { salesStats, payrollList } from "../../data/adminData";

const AdminSales = () => {
  return (
    <>
      <PageTitle>매출 관리</PageTitle>

      {/* 상단 통계 카드 */}
      <StatsRow>
        {salesStats.map((stat, index) => (
          <SalesCard key={index}>
            <div className="title">{stat.title}</div>
            <div className="value">{stat.value}</div>
            <div className="sub">{stat.sub}</div>
          </SalesCard>
        ))}
      </StatsRow>

      {/* 급여 리스트 및 요약 */}
      <ContentRow>
        <div style={{ flex: 2 }}>
          <TableContainer>
            <h3 style={{ marginBottom: "20px" }}>직원별 예상 지급액</h3>
            <StyledTable>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>직급</th>
                  <th>근무일</th>
                  <th>근무시간</th>
                  <th>기본급</th>
                  <th>주휴수당</th>
                  <th>연장수당</th>
                  <th>총 지급액</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {payrollList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.role}</td>
                    <td>{item.days}</td>
                    <td>{item.hours}</td>
                    <td>₩{item.base}</td>
                    <td>₩{item.allowance}</td>
                    <td>₩{item.extra}</td>
                    <td>
                      <strong>₩{item.total}</strong>
                    </td>
                    <td>
                      <StatusBadge status={item.status}>
                        {item.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
        </div>
      </ContentRow>
    </>
  );
};

export default AdminSales;

// --- 스타일 ---
const StatsRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const SalesCard = styled.div`
  flex: 1;
  background: white;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);

  .title {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }
  .value {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }
  .sub {
    font-size: 13px;
    color: #999;
  }
`;

const ContentRow = styled.div`
  display: flex;
  gap: 20px;
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => (props.status === "완료" ? "#eee" : "#111")};
  color: ${(props) => (props.status === "완료" ? "#aaa" : "#fff")};
`;
