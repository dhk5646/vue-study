<template>
  <header class="header">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo"/>
      <div class="search-container">
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
      <!-- 로그인 버튼 공간 -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import eventBus from '@/common/eventBus'

const searchQuery = ref('');

// 검색 처리 함수
const handleSearch = () => {
    eventBus.setSearchQuery(searchQuery.value.trim()); // 검색어를 Event Bus에 설정

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
}


.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 25px;
  overflow: hidden;
}

.search-input {
  border: none;
  padding: 10px 15px;
  outline: none;
  font-size: 16px;
  width: 200px; /* 원하는 크기로 조정 */
}

.search-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.right-section {
  /* 우측 상단 섹션, 필요에 따라 스타일 추가 */
}
</style>
