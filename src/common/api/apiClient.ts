import axios from 'axios';

// Axios 기본 설정을 가진 인스턴스 생성
const apiClient = axios.create({
  baseURL: "http://localhost:18010",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 요청 타임아웃 설정 (ms)
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업 (예: 토큰 추가)
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    // 오류 응답 처리 (예: 토큰 만료)
    return Promise.reject(error);
  }
);

export default apiClient;