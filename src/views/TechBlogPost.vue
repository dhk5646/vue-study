<template>
  <div class="container">
    <h1 class="title">Tech Blog Posts</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <table class="tech-blog-table">
        <thead>
        <tr>
          <th class="company-column">Company</th>
          <th class="title-column">Title</th>
          <th class="date-column">Publish Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="post in posts" :key="post.techBlogPostSeq">
          <td class="company-column">{{ post.techBlogEnum }}</td>
          <td class="title-column">
            <a :href="post.url" target="_blank">{{ post.title }}</a>
          </td>
          <td class="date-column">{{ formatDate(post.publishedDateTime) }}</td>
        </tr>
        </tbody>
      </table>
      <Pagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        @updatePage="handlePageUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import apiClient from '@/common/api/apiClient';
import Pagination from '@/components/pagination/Pagination.vue';  // Pagination 컴포넌트 임포트
import { formatDate } from '@/common/utils/dateUtils'

export default defineComponent({
  name: 'TechBlogPost',
  methods: { formatDate },
  components: { Pagination },
  setup() {
    const posts = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const pageSize = ref(10); // 페이지 크기 설정
    const totalPages = ref(0); // 전체 페이지 수

    // API에서 포스트 데이터 가져오기
    const fetchPosts = async (page: number = 1) => {
      loading.value = true; // 로딩 상태 시작
      currentPage.value = page;
      try {
        const response = await apiClient.get(`/tech-blog-post?pageNumber=${page}&pageSize=${pageSize.value}`);
        posts.value = response.data.content;
        totalPages.value = response.data.pageData.totalPages; // 전체 페이지 수 업데이트
      } catch (error) {
        console.error('Failed to fetch tech blog posts:', error);
      } finally {
        loading.value = false; // 로딩 상태 종료
      }
    };

    // 컴포넌트 마운트 시 첫 페이지 로딩
    onMounted(() => fetchPosts());

    // 페이지 업데이트 핸들러
    const handlePageUpdate = (newPage: number) => {
      fetchPosts(newPage); // 페이지 번호에 맞는 데이터를 다시 로드
    };
    return { posts, loading, totalPages, currentPage, fetchPosts, handlePageUpdate };
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #888;
}

.tech-blog-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 1.1em; /* 테이블 폰트 크기 증가 */
}

.tech-blog-table th,
.tech-blog-table td {
  padding: 15px; /* 셀의 패딩을 늘려서 크기를 키움 */
  border: 1px solid #ddd;
}

.tech-blog-table th {
  background-color: #f4f4f4;
  font-weight: bold;
  text-align: center;
}

.tech-blog-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tech-blog-table tbody tr:hover {
  background-color: #f1f1f1;
}

a {
  color: #1a73e8;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.company-column {
  text-align: center;
}

/* 특정 열의 너비 설정 */
.title-column {
  width: 700px; /* 너비를 조정하여 Title 열을 더 넓게 설정 */
}

/* 특정 열의 너비 설정 */
.date-column {
  width: 150px; /* 너비를 조정하여 Title 열을 더 넓게 설정 */
  text-align: center;
}
</style>
