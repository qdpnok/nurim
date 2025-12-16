import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8222/api", // 백엔드 서버 주소
  withCredentials: true, // 핵심: 쿠키(세션ID)를 주고받기 위해 필수
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
