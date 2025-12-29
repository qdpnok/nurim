import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Admin/AdminComponents/admin/AdminSidebar";
import { AdminContainer, ContentArea } from "../styles/AdminStyles";

const AdminLayout = () => {
  return (
    <AdminContainer>
      <AdminSidebar />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </AdminContainer>
  );
};

export default AdminLayout;
