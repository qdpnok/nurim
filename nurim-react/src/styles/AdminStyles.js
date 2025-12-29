// src/styles/AdminStyles.js
import styled from "styled-components";

export const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const SidebarContainer = styled.div`
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
`;

export const LogoArea = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 20px 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  padding: 15px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => (props.active ? "#4A7C75" : "#555")};
  background-color: ${(props) => (props.active ? "#E8F3F1" : "transparent")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-right: ${(props) => (props.active ? "3px solid #4A7C75" : "none")};

  &:hover {
    background-color: #f8f9fa;
    color: #4a7c75;
  }

  svg {
    margin-right: 10px;
    font-size: 18px;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 40px;
  margin-left: 260px; /* Sidebar width */
  overflow-y: auto;
`;

export const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const PageSubTitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
`;

// 대시보드 그리드
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

export const StatCardBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
    margin-bottom: 15px;
    font-size: 14px;
  }

  .count {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .trend {
    font-size: 13px;
    font-weight: 500;

    &.up {
      color: #2ecc71;
    }
    &.down {
      color: #e74c3c;
    }
  }
`;

// 테이블 스타일
export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 15px;
    color: #888;
    font-weight: 500;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #f9f9f9;
    font-size: 14px;
    color: #555;
  }

  .status-badge {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;

    &.완료 {
      background: #e8f5e9;
      color: #2e7d32;
    }
    &.대기중 {
      background: #fff3e0;
      color: #ef6c00;
    }
    &.취소 {
      background: #ffebee;
      color: #c62828;
    }
  }
`;
