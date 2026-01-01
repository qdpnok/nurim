import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8222/api", // 백엔드 서버 주소
  // withCredentials: true, // JWT를 헤더로 보낼 때는 보통 false로 하거나 생략해도 됩니다. (쿠키 사용 시에만 true)
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터 추가 (여기가 핵심입니다!)
api.interceptors.request.use(
  (config) => {
    // 1. 로컬 스토리지에서 토큰 가져오기 (저장된 키 이름이 'accessToken'인지 확인 필요)
    const token = localStorage.getItem("accessToken");

    // 2. 토큰이 있다면 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
