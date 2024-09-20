<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="cards-container">
        <div v-for="post in posts" :key="post.techBlogPostSeq" class="post-card">
          <div class="card-header">
            <img :src="getCompanyLogo(post.techBlogEnum)" alt="Company Logo" class="company-logo" />
            <div class="card-company">{{ post.techBlogEnum }}</div>
          </div>
          <div class="card-content">
            <h3 class="card-title">
              <a :href="post.url" target="_blank">{{ post.title }}</a>
            </h3>
            <p class="card-date">{{ formatDate(post.publishedDateTime) }}</p>
          </div>
        </div>
      </div>
      <Pagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        @updatePage="handlePageUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import apiClient from '@/common/api/apiClient'
import Pagination from '@/components/pagination/Pagination.vue'
import { formatDate } from '@/common/utils/dateUtils'
import eventBus from '@/common/eventBus'

export default defineComponent({
  name: 'TechBlogPost',
  methods: { formatDate },
  components: { Pagination },
  setup() {
    const posts = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const pageSize = ref(12);
    const totalPages = ref(0);
    const searchQuery = ref('');

    // 검색어가 변경될 때마다 API 호출
    watch(() => eventBus.searchQuery, (newQuery) => {
      searchQuery.value = newQuery;
      fetchPosts();
    });

    // API에서 포스트 데이터 가져오기
    const fetchPosts = async (page: number = 1) => {
      loading.value = true;
      currentPage.value = page;
      try {
        const response = await apiClient.get(`/tech-blog-post?query=${searchQuery.value}&pageNumber=${page}&pageSize=${pageSize.value}`);
        posts.value = response.data.content;
        totalPages.value = response.data.pageData.totalPages;
      } catch (error) {
        console.error('Failed to fetch tech blog posts:', error);
      } finally {
        loading.value = false;
      }
    };

    // 컴포넌트 마운트 시 첫 페이지 로딩
    onMounted(() => fetchPosts());

    // 페이지 업데이트 핸들러
    const handlePageUpdate = (newPage: number) => {
      fetchPosts(newPage);
    };

    // 회사 로고 URL 반환
    const getCompanyLogo = (techBlogEnum: string) => {
      // 회사 이름에 따라 로고 URL 설정 (예시)
      const logoMap: { [key: string]: string } = {
        // KAKAO: 'https://your-cdn.com/kakao-logo.png',
        // 기타 회사 로고 추가...
      };
      return logoMap[techBlogEnum] || '@/assets/log.svg';
    };

    return { posts, loading, totalPages, currentPage, fetchPosts, handlePageUpdate, getCompanyLogo };
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  font-family: 'Arial', sans-serif;
}


.loading {
  text-align: center;
  font-size: 1.5em;
  color: #888;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 카드 간격 */
  justify-content: center; /* 가운데 정렬 */
  margin-bottom: 30px;
}

.post-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  width: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-header {
  background-color: #f9f9f9;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.company-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.card-company {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.card-content {
  padding: 15px;
  flex-grow: 1; /* 카드 내용이 남는 공간을 채우도록 설정 */
}

.card-title {
  font-size: 1.4em;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #1a73e8;
}

.card-title a {
  text-decoration: none;
  color: inherit;
}

.card-title a:hover {
  text-decoration: underline;
}

.card-date {
  font-size: 0.9em;
  color: #666;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination button {
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:hover {
  background-color: #155abc;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
