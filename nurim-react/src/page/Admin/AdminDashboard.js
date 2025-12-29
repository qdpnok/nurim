import React from "react";
import {
  PageTitle,
  PageSubTitle,
  DashboardGrid,
  StatCardBox,
  TableContainer,
  StyledTable,
} from "../../styles/AdminStyles";
import { dashboardStats, recentActivities } from "../../data/adminData";
import {
  FaUserFriends,
  FaCreditCard,
  FaShoppingBag,
  FaChartLine,
} from "react-icons/fa";

const AdminDashboard = () => {
  // 아이콘 매핑
  const getIcon = (type) => {
    switch (type) {
      case "users":
        return <FaUserFriends />;
      case "subscription":
        return <FaCreditCard />;
      case "purchase":
        return <FaShoppingBag />;
      case "admin":
        return <FaChartLine />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageTitle>대시보드</PageTitle>
      <PageSubTitle>누림 운영 현황을 한눈에 확인하세요</PageSubTitle>

      {/* 상단 통계 카드 */}
      <DashboardGrid>
        {dashboardStats.map((stat) => (
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

      {/* 최근 활동 로그 테이블 */}
      <TableContainer>
        <h3>최근 활동</h3>
        <StyledTable>
          <thead>
            <tr>
              <th>활동 유형</th>
              <th>설명</th>
              <th>시스템</th>
              <th>시간</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.type}</td>
                <td>{activity.desc}</td>
                <td>{activity.system}</td>
                <td>{activity.time}</td>
                <td>
                  <span className={`status-badge ${activity.status}`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </>
  );
};

export default AdminDashboard;
