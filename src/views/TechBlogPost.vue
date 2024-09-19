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
          <td>{{ post.techBlogEnum }}</td>
          <td>
            <a :href="post.url" target="_blank">{{ post.title }}</a>
          </td>
          <td>{{ formatDate(post.publishedDateTime) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import apiClient from '@/common/api/apiClient';

export default defineComponent({
  name: 'TechBlogPost',
  setup() {
    const posts = ref([]);
    const loading = ref(true);

    // API를 호출하여 데이터를 가져오는 함수
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/tech-blog-post');
        posts.value = response.data;
        console.log(response);
      } catch (error) {
        console.error('Failed to fetch tech blog posts:', error);
      } finally {
        loading.value = false;
      }
    };

    // 컴포넌트가 마운트될 때 데이터를 가져옴
    onMounted(fetchPosts);

    // 날짜 형식을 YYYY-MM-DD로 변환하는 함수
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    return { posts, loading, formatDate };
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
  padding: 16px; /* 셀의 패딩을 늘려서 크기를 키움 */
  border: 1px solid #ddd;
  text-align: left;
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

/* 특정 열의 너비 설정 */
.title-column {
  width: 1400px; /* 너비를 조정하여 Title 열을 더 넓게 설정 */
}

/* 특정 열의 너비 설정 */
.date-column {
  width: 200px; /* 너비를 조정하여 Title 열을 더 넓게 설정 */
}
</style>
