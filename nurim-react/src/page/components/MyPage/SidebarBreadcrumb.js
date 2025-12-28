import React from "react";
import styled from "styled-components";

const BreadcrumbContainer = styled.div`
  font-size: 16px;
  color: #888;
  margin-bottom: 40px;

  span {
    color: #333;
    font-weight: 500;
  }
`;

const SidebarBreadcrumb = () => {
  return (
    <BreadcrumbContainer>
      Home &gt; <span>My Page</span>
    </BreadcrumbContainer>
  );
};

export default SidebarBreadcrumb;
