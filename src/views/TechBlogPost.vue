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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import apiClient from '@/common/api/apiClient'
import { formatDate } from '@/common/utils/dateUtils'
import eventBus from '@/common/eventBus'
import kakaoLogo from '@/assets/company/logo/kakao.png'
import naverLogo from '@/assets/company/logo/naver.png'

export default defineComponent({
  name: 'TechBlogPost',
  methods: { formatDate },
  setup() {
    const posts = ref<any[]>([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const pageSize = ref(100);
    const totalPages = ref(0);
    const searchQuery = ref('');
    const isFetching = ref(false); // 현재 데이터를 가져오는 중인지 확인하는 변수

    // 스크롤 핸들러
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomPosition = document.documentElement.offsetHeight - 100;

      if (scrollPosition >= bottomPosition && !isFetching.value) {
        fetchPosts();
      }
    };

    // API에서 포스트 데이터 가져오기
    const fetchPosts = async () => {

      if (isFetching.value || (totalPages.value !== 0 && currentPage.value > totalPages.value)) return; // totalPages가 0인 경우에도 데이터 요청

      loading.value = currentPage.value === 1; // 첫 페이지 로딩 상태
      isFetching.value = true; // 데이터를 가져오는 중임을 표시

      try {
        const response = await apiClient.get(`/tech-blog-post`, {
          params: {
            query: searchQuery.value || '', // 검색어가 없을 경우에도 요청 보내기
            pageNumber: currentPage.value,
            pageSize: pageSize.value,
          }
        });

        if (currentPage.value === 1) {
          posts.value = response.data.content; // 첫 페이지일 경우 기존 데이터를 초기화
        } else {
          posts.value.push(...response.data.content); // 이후 페이지 데이터는 기존에 추가
        }

        totalPages.value = response.data.pageData.totalPages;
        currentPage.value++;
      } catch (error) {
        console.error('Failed to fetch tech blog posts:', error);
      } finally {
        loading.value = false;
        isFetching.value = false; // 데이터 가져오기 완료
      }
    };

    // 검색어가 변경될 때마다 API 호출
    watch(() => eventBus.searchQuery, (newQuery) => {
      searchQuery.value = newQuery;
      currentPage.value = 1; // 검색어가 변경되면 첫 페이지로 초기화
      fetchPosts();
    });

    // 컴포넌트 마운트 시 첫 페이지 로딩 및 스크롤 이벤트 리스너 등록
    onMounted(() => {
      fetchPosts(); // 첫 페이지 로딩
      window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
    });

    // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 해제
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    // 회사 로고 URL 반환
    const getCompanyLogo = (techBlogEnum: string) => {
      const logoMap: { [key: string]: string } = {
        KAKAO: kakaoLogo,
        NAVER: naverLogo,
        // 다른 회사 로고 추가 가능...
      };
      return logoMap[techBlogEnum] || '@/assets/log.svg';
    };

    return { posts, loading, getCompanyLogo };
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
  gap: 20px;
  justify-content: center;
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
  flex-grow: 1;
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
</style>
