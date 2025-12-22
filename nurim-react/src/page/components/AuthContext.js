import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 처음 로드될 때 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  // 로그인 함수 (로그인 페이지에서 호출)
  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true); // 상태 업데이트 -> 리렌더링 트리거
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false); // 상태 업데이트 -> 리렌더링 트리거
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
