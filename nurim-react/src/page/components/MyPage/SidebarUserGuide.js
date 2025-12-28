import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai"; // 아이콘 설치 필요 (npm install react-icons)

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 30px 0;
`;

const UserGuideLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
  text-decoration: none;

  &:hover {
    color: #000;
    font-weight: bold;
  }
`;

const SidebarUserGuide = () => {
  return (
    <>
      <Divider />
      <UserGuideLink to="/guide">
        <AiOutlineInfoCircle size={18} /> User Guide
      </UserGuideLink>
    </>
  );
};

export default SidebarUserGuide;
