import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버 주소 확인 필요
  withCredentials: true, // 세션 쿠키 전송을 위해 필수
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
