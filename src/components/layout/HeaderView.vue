<template>
  <header class="header">
    <div class="logo-container">
      <h1 class="logo-text">TECH POST</h1> <!-- 로고 텍스트 추가 -->
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
        <button class="close-button" @click="toggleMobileSearch">X</button>
        <button class="search-button" @click="handleSearch" type="button" tabindex="-1">
          <img src="@/assets/images/search.png" alt="Search Icon" class="search-icon"/>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import eventBus from '@/common/eventBus';

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
</script>

<style scoped>
.header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: white; /* 배경 색 추가 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  justify-content: space-between; /* 모바일에서 우측 섹션과 로고 섹션 간격 유지 */
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: 'Spoqa Han Sans', sans-serif; /* 모던한 폰트 적용 */
  font-size: 1.7em; /* 로고 크기 조정 (필요에 따라 조정 가능) */
  font-weight: 900; /* 볼드 효과 적용 */
  margin-right: 20px; /* 로고와 검색창 간격 조정 */
  color: #333; /* 텍스트 색상 설정 */
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 25px;
  overflow: hidden;
  width: 300px; /* 기본 너비 설정 */
  max-width: 100%; /* 최대 너비를 100%로 설정하여 화면 크기에 맞춤 */
}

.search-input {
  border: none;
  padding: 10px 15px;
  outline: none;
  font-size: 16px;
  flex: 1; /* 남은 공간을 채우도록 설정 */
  width: 0; /* flexbox 내에서 flex 기준으로 너비 조정 */
}

.search-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
  display: flex; /* 아이콘 정렬을 위한 flex */
  align-items: center; /* 세로 정렬 */
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
  z-index: 1000; /* 다른 요소 위에 나타나도록 설정 */
  padding: 0 20px;
}

.mobile-search-input {
  border: none;
  padding: 10px 15px;
  outline: none;
  font-size: 16px;
  flex: 1;
}

.close-button {
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

/* 모바일에서 스타일 조정 */
@media (max-width: 768px) {
  .search-container.desktop-only {
    display: none; /* 데스크탑용 검색창 숨기기 */
  }
  .mobile-only {
    display: flex; /* 모바일에서 돋보기 버튼 보이기 */
  }
}
</style>
