import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SidebarContainer,
  LogoArea,
  MenuList,
  MenuItem,
} from "../../../../styles/AdminStyles";
import {
  FaHome,
  FaQuestionCircle,
  FaListAlt,
  FaComments,
  FaClipboardList,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaTruck, FaChartBar } from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "대시보드", path: "/admin", icon: <FaHome /> },
    { name: "FAQ 관리", path: "/admin/faq", icon: <FaQuestionCircle /> }, // 문의관리 FAQ
    { name: "QnA 관리", path: "/admin/qna", icon: <FaComments /> }, // 문의관리 QnA
    { name: "상품 등록 관리", path: "/admin/products", icon: <FaBoxOpen /> },
    {
      name: "상담 신청 내역",
      path: "/admin/AdminConsultationDetail",
      icon: <FaClipboardList />,
    }, // 문의관리 상담신청
    // 필요시 추가 메뉴 확장
    { name: "주문 내역 관리", path: "/admin/orders", icon: <FaTruck /> },
    { name: "매출 관리", path: "/admin/sales", icon: <FaChartBar /> },
    { name: "회원 정보 조회", path: "/admin/members", icon: <FaUser /> }, // 추가!
    {
      name: "회원 탈퇴 관리",
      path: "/admin/withdrawal",
      icon: <FaUserSlash />,
    },
  ];

  return (
    <SidebarContainer>
      <LogoArea>NURIM ADMIN</LogoArea>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default AdminSidebar;
