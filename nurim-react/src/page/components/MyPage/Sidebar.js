import React from "react";
import styled from "styled-components";
import SidebarBreadcrumb from "./SidebarBreadcrumb";
import SidebarMenu from "./SidebarMenu";
import SidebarUserGuide from "./SidebarUserGuide";

const SidebarContainer = styled.div`
  width: 259px;
  display: flex;
  flex-direction: column;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      {/* 1. 상단 경로 (Home > My Page) */}
      <SidebarBreadcrumb />

      {/* 2. 메인 메뉴 리스트 (구독, 구매, 쇼핑, 리뷰) */}
      <SidebarMenu />

      {/* 3. 하단 유저 가이드 (구분선 포함) */}
      <SidebarUserGuide />
    </SidebarContainer>
  );
};

export default Sidebar;
