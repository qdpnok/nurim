import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// allowedStatus: 이 페이지에 접근 가능한 상태 (예: "ACTIVE")
// 만약 allowedStatus를 안 보내면, '로그인만 하면 다 되는' 페이지로 동작
const ProtectedRoute = ({ allowedStatus }) => {
  const token = localStorage.getItem("accessToken");
  const memberStatus = localStorage.getItem("memberStatus");

  // 1. 로그인이 안 된 경우 -> 로그인 페이지로
  if (!token) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/login" replace />;
  }

  // 2. 상태(Status) 체크
  // 예: allowedStatus가 "ACTIVE"인데, 내 상태가 "BANNED"라면?
  if (allowedStatus && memberStatus !== allowedStatus) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" replace />; // 홈으로 튕겨냄
  }

  // 3. 통과 -> 원래 가려던 페이지(자식 라우트) 보여줌
  return <Outlet />;
};

export default ProtectedRoute;
