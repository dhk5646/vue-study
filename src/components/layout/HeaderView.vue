<template>
  <header class="header">
    <div class="logo-container">
      <h1 class="logo-text">TECH POST</h1>
      <!-- 데스크탑 화면에서만 검색창 표시 -->
      <div class="search-container desktop-only">
        <input
          type="text"
          placeholder="Search"
          class="search-input"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
        <button class="search-button" @click="handleSearch" type="button" tabindex="-1">
          <img src="@/assets/images/search.png" alt="Search Icon" class="search-icon"/>
        </button>
      </div>
    </div>
    <div class="right-section">
      <!-- 모바일 화면에서 돋보기 아이콘 표시 -->
      <button class="mobile-search-button mobile-only" @click="toggleMobileSearch">
        <img src="@/assets/images/search.png" alt="Search Icon" class="search-icon"/>
      </button>
      <!-- 모바일에서 검색창이 표시될 때 -->
      <div class="mobile-search-container" v-if="showMobileSearch">
        <input
          type="text"
          placeholder="Search"
          class="mobile-search-input"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
        <!-- X 버튼 클릭 시 검색어 초기화 -->
        <button class="clear-button" @click="clearSearch">X</button>
        <button class="search-button" @click="handleSearch" type="button" tabindex="-1">
          <img src="@/assets/images/search.png" alt="Search Icon" class="search-icon"/>
        </button>
      </div>

      <!-- 로그인 버튼 추가 -->
      <button class="login-button" @click="goToLogin">Login</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import eventBus from '@/common/eventBus';
import router from '@/router'

const searchQuery = ref('');
const showMobileSearch = ref(false);

// 검색 처리 함수
const handleSearch = () => {
  eventBus.setSearchQuery(searchQuery.value.trim()); // 검색어를 Event Bus에 설정
  showMobileSearch.value = false; // 검색 후 모바일 검색창 닫기
};

// 모바일 검색창 표시/숨기기 함수
const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value;
};

// 검색어 초기화 함수
const clearSearch = () => {
  searchQuery.value = '';
};

// 로그인 페이지로 이동하는 함수
const goToLogin = () => {
  router.push({ name: 'login' }); // 'login' 라우트로 이동
};
</script>

<style scoped>
.header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: 'Spoqa Han Sans', sans-serif;
  font-size: 1.7em;
  font-weight: 900;
  margin-right: 20px;
  color: #333;
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 25px;
  overflow: hidden;
  width: 300px;
  max-width: 100%;
}

.search-input {
  border: none;
  padding: 10px 15px;
  outline: none;
  font-size: 16px;
  flex: 1;
  width: 0;
}

.search-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.right-section {
  display: flex;
  align-items: center;
}

.mobile-search-button {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.mobile-search-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0 20px;
}

.mobile-search-input {
  border: none;
  padding: 10px 15px;
  outline: none;
  font-size: 16px;
  flex: 1;
}

.clear-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 10px;
}

.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

.login-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin-left: 20px;
  border-radius: 25px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .search-container.desktop-only {
    display: none;
  }
  .mobile-only {
    display: flex;
  }
}
</style>
