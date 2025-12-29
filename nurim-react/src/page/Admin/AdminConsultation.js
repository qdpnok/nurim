import React, { useState } from "react";
import styled from "styled-components";
import {
  PageTitle,
  PageSubTitle,
  TableContainer,
  StyledTable,
  StatCardBox,
  DashboardGrid,
} from "../../styles/AdminStyles";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import ConsultationModal from "../components/Modal/AdminConsultationDetail"; // 상세 모달 (아래 2번 코드 참고)
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// 1. 차트 데이터 (이미지 우측 도넛 차트)
const chartData = [
  { name: "구독 고객", value: 45 },
  { name: "구매 고객", value: 32 },
  { name: "일반 고객", value: 28 },
];
const COLORS = ["#375a55", "#6a9c94", "#d3d3d3"]; // 차트 색상 (이미지 톤 반영)

// 2. 상단 통계 카드 데이터
const statsData = [
  { title: "구독 상담 신청", count: "2,847", trend: "+12%", type: "up" },
  { title: "구매 상담 신청", count: "1,234", trend: "+8%", type: "up" },
  { title: "인수 상담 신청", count: "1,613", trend: "-3%", type: "down" },
  { title: "반납 상담 신청", count: "136", trend: "-8%", type: "down" },
];

// 3. 상담 리스트 더미 데이터
const consultationList = [
  {
    id: 1,
    type: "구독 상담",
    date: "2025.12.20",
    user: "이누림",
    time: "9일 전",
    status: "완료",
    product: "LG 스탠바이미",
  },
  {
    id: 2,
    type: "구매 상담",
    date: "2025.12.20",
    user: "이상미",
    time: "9일 전",
    status: "완료",
    product: "삼성 비스포크",
  },
  {
    id: 3,
    type: "인수 상담",
    date: "2025.12.26",
    user: "김경선",
    time: "3일 전",
    status: "대기중",
    product: "LG 오브제",
  },
  {
    id: 4,
    type: "반납 상담",
    date: "2025.12.28",
    user: "이민아",
    time: "1일 전",
    status: "대기중",
    product: "다이슨 에어랩",
  },
  {
    id: 5,
    type: "인수 상담",
    date: "2025.12.29",
    user: "정동균",
    time: "6시간 전",
    status: "완료",
    product: "삼성 Q9000",
  },
];

const AdminConsultation = () => {
  const [selectedItem, setSelectedItem] = useState(null); // 모달용 상태

  return (
    <>
      <PageTitle>상담 신청 내역</PageTitle>

      {/* 상단 4개 통계 카드 */}
      <DashboardGrid>
        {statsData.map((stat, index) => (
          <StatCardBox key={index} style={{ padding: "20px" }}>
            <div
              className="header"
              style={{ fontSize: "14px", marginBottom: "10px" }}
            >
              {stat.title}
            </div>
            <div
              className="count"
              style={{ fontSize: "24px", marginBottom: "5px" }}
            >
              {stat.count}
            </div>
            <div
              className={`trend ${stat.type}`}
              style={{
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              {stat.type === "up" ? (
                <FaArrowUp size={10} />
              ) : (
                <FaArrowDown size={10} />
              )}
              {stat.trend} 전월 대비
            </div>
          </StatCardBox>
        ))}
      </DashboardGrid>

      <ContentRow>
        {/* 좌측: 상담 신청 리스트 */}
        <ListSection>
          <h3>상담 신청 처리 현황</h3>
          <StyledTable>
            <thead>
              <tr>
                <th>상담 유형</th>
                <th>신청일</th>
                <th>고객명</th>
                <th>시간</th>
                <th>상태</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {consultationList.map((item) => (
                <tr key={item.id}>
                  <td>{item.type}</td>
                  <td>{item.date}</td>
                  <td>{item.user}</td>
                  <td>{item.time}</td>
                  <td>
                    <StatusBadge status={item.status}>
                      {item.status}
                    </StatusBadge>
                  </td>
                  <td>
                    <DetailButton onClick={() => setSelectedItem(item)}>
                      상세보기
                    </DetailButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </ListSection>

        {/* 우측: 도넛 차트 */}
        <ChartSection>
          <h3>NR 상담 신청 현황</h3>
          <div style={{ height: "250px", position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
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
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ right: 0 }}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* 도넛 가운데 텍스트 (옵션) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "35%",
                transform: "translate(-50%, -50%)",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#555",
              }}
            ></div>
          </div>
          <div
            style={{
              textAlign: "right",
              marginTop: "10px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            더보기 &gt;
          </div>
        </ChartSection>
      </ContentRow>

      {/* 하단 검색 필터 */}
      <FilterBar>
        <input type="text" placeholder="상담유형" />
        <input type="date" placeholder="신청일" />
        <input type="text" placeholder="고객명" />
        <input type="text" placeholder="상태" />
        <button>필터</button>
      </FilterBar>

      {/* 페이지네이션 */}
      <Pagination>
        <button>&lt; Previous</button>
        <div className="nums">
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>10</button>
        </div>
        <button>Next &gt;</button>
      </Pagination>

      {/* 상세 모달 팝업 */}
      {selectedItem && (
        <ConsultationModal
          data={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default AdminConsultation;

// --- 스타일 컴포넌트 ---
const ContentRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const ListSection = styled(TableContainer)`
  flex: 2;
  margin-bottom: 0;
  h3 {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const ChartSection = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  h3 {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const StatusBadge = styled.span`
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${(props) =>
    props.status === "완료" ? "#e8f5e9" : "#fff3e0"};
  color: ${(props) => (props.status === "완료" ? "#2e7d32" : "#ef6c00")};
`;

const DetailButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #333;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center; /* 중앙 정렬 */

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 150px;
  }
  button {
    padding: 10px 25px;
    background: #666;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;

  button {
    background: white;
    border: 1px solid #ddd;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  .nums {
    display: flex;
    gap: 5px;
  }
  .nums button {
    border: none;
  }
  .nums button.active {
    background: #eee;
    font-weight: bold;
  }
`;
