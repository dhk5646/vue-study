<template>
  <div class="login-container">
    <div class="login-box">
      <h3 class="login-title">LOGIN</h3>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="id">ID</label>
          <input type="id" id="id" v-model="id" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="button-group">
          <button type="submit" class="login-button">Login</button>
        </div>
        <router-link to="/find-account" class="find-account-link">Find Account</router-link>
        <p class="signup-text">Not a member? <router-link to="/signup" class="signup-link">Sign up now</router-link></p>
      </form>
      <hr class="divider" />
      <div class="social-login">
        <p class="social-text">Or login with:</p>
        <button class="social-button google" @click="handleSocialLogin('Google')">Google</button>
        <button class="social-button kakao" @click="handleSocialLogin('Kakao')">Kakao</button>
        <button class="social-button naver" @click="handleSocialLogin('Naver')">Naver</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/common/api/apiClient'

const id = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {

  try {
    const response = await apiClient.get(`/login`, {
      params: {
        id:id.value,
        password:password.value,
      }
    });

    if(response.data.isValid) {
      alert('성공');
      await router.push({ name: 'home' });
    } else {
      alert('실패');
    }

  } catch (error) {
    console.error('Failed to fetch tech blog posts:', error);
  }
};

// 추가된 소셜 로그인 핸들러
const handleSocialLogin = (provider: string) => {
  alert(`${provider} 로그인 버튼 클릭`);
  // 여기에 실제 소셜 로그인 로직을 추가하세요.
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px; /* 넓이를 400px로 변경 */
  text-align: center;
  transition: box-shadow 0.3s ease; /* transform 제거 */
}

.login-box:hover {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.login-title {
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: bold;
  color: #007bff; /* 색상 변경 */
}

.login-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.button-group {
  margin-bottom: 10px; /* 로그인 버튼과 계정 찾기 링크 사이의 여백 */
}

.login-button {
  width: 100%; /* 버튼을 전체 너비로 설정 */
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease; /* transform 제거 */
}

.login-button:hover {
  background-color: #0056b3;
}

.find-account-link {
  display: inline-block; /* 인라인 블록으로 설정 */
  margin-top: 10px; /* 위쪽 여백 추가 */
  color: #007bff; /* 텍스트 색상 */
  font-weight: bold; /* 굵게 */
  text-decoration: none; /* 링크의 기본 텍스트 장식 제거 */
}

.find-account-link:hover {
  text-decoration: underline; /* 호버 시 텍스트 장식 추가 */
}

.signup-text {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

.signup-link {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}

/* 구분선 스타일 */
.divider {
  margin: 20px 0; /* 위아래 여백 */
  border: 0; /* 기본 테두리 제거 */
  height: 1px; /* 두께 */
  background-color: #ddd; /* 색상 */
}

/* 소셜 로그인 스타일 */
.social-login {
  margin-top: 20px;
}

.social-text {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.social-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-bottom: 10px; /* 버튼 간의 간격 */
}

.social-button.google {
  background-color: #db4437; /* Google 색상 */
  color: white;
}

.social-button.google:hover {
  background-color: #c13528;
}

.social-button.kakao {
  background-color: #fee500; /* Kakao 색상 */
  color: black;
}

.social-button.kakao:hover {
  background-color: #fbdc00;
}

.social-button.naver {
  background-color: #03c75a; /* Naver 색상 */
  color: white;
}

.social-button.naver:hover {
  background-color: #02b84c;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .login-box {
    width: 100%;
    padding: 30px;
  }

  .login-title {
    font-size: 24px;
  }
}
</style>
