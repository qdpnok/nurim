import React, { useState } from "react";
import styled from "styled-components";
import {
  PageTitle,
  PageSubTitle,
  TableContainer,
  StyledTable,
} from "../../styles/AdminStyles";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import ConsultationModal from "./components/ConsultationModal"; // (8번에서 생성)

// 차트 데이터
const chartData = [
  { name: "구독 상담", value: 45 },
  { name: "구매 상담", value: 32 },
  { name: "일반/기타", value: 23 },
];
const COLORS = ["#4A7C75", "#88B04B", "#D7CCC8"];

// 테이블 데이터
const consultationList = [
  {
    id: 1,
    type: "구독 상담",
    date: "2025.12.20",
    user: "이누림",
    product: "LG 스탠바이미",
    status: "완료",
  },
  {
    id: 2,
    type: "구매 상담",
    date: "2025.12.20",
    user: "이상미",
    product: "삼성 비스포크",
    status: "완료",
  },
  {
    id: 3,
    type: "인수 상담",
    date: "2025.12.26",
    user: "김경선",
    product: "LG 오브제",
    status: "대기중",
  },
  {
    id: 4,
    type: "반납 상담",
    date: "2025.12.28",
    user: "이민아",
    product: "다이슨 에어랩",
    status: "대기중",
  },
];

const AdminConsultation = () => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  return (
    <>
      <PageTitle>상담 신청 내역</PageTitle>
      <PageSubTitle>
        사용자의 상담 신청 현황을 확인하고 처리하세요.
      </PageSubTitle>

      <TopSection>
        {/* 통계 카드 영역 (생략 가능, 대시보드와 유사) */}

        {/* 차트 영역 */}
        <ChartBox>
          <h3>상담 신청 현황</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </TopSection>

      <TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3>상담 신청 리스트</h3>
          <FilterInput placeholder="고객명 검색..." />
        </div>
        <StyledTable>
          <thead>
            <tr>
              <th>상담 유형</th>
              <th>신청일</th>
              <th>고객명</th>
              <th>관심 제품</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {consultationList.map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>{item.user}</td>
                <td>{item.product}</td>
                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <DetailButton onClick={() => setSelectedConsultation(item)}>
                    상세보기
                  </DetailButton>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      {/* 상세 모달 */}
      {selectedConsultation && (
        <ConsultationModal
          data={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
        />
      )}
    </>
  );
};

export default AdminConsultation;

const TopSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const ChartBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  flex: 1;
  h3 {
    margin-bottom: 20px;
    font-size: 16px;
    color: #333;
  }
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DetailButton = styled.button`
  background: transparent;
  border: 1px solid #bbb;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: #f0f0f0;
  }
`;
