<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="posts-container">
        <div v-for="post in posts" :key="post.techBlogPostSeq" class="post-row">
          <div class="row-content">
            <div class="post-details">
              <h3 class="card-title">
                <a :href="post.url" target="_blank">{{ post.title }}</a>
              </h3>
              <div class="company-info">
                <img :src="getCompanyLogo(post.techBlogEnum)" alt="Company Logo" class="company-logo" />
                <span class="card-company">{{ post.techBlogEnum }}</span>
                <time class="card-date">{{ formatDate(post.publishedDateTime) }}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import apiClient from '@/common/api/apiClient';
import { formatDate } from '@/common/utils/dateUtils';
import eventBus from '@/common/eventBus';
import kakaoLogo from '@/assets/company/logo/kakao.png';
import naverLogo from '@/assets/company/logo/naver.png';

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
    const isFetching = ref(false);

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomPosition = document.documentElement.offsetHeight - 100;

      if (scrollPosition >= bottomPosition && !isFetching.value) {
        fetchPosts();
      }
    };

    const fetchPosts = async () => {
      if (isFetching.value || (totalPages.value !== 0 && currentPage.value > totalPages.value)) return;

      loading.value = currentPage.value === 1;
      isFetching.value = true;

      try {
        const response = await apiClient.get(`/tech-blog-post`, {
          params: {
            query: searchQuery.value || '',
            pageNumber: currentPage.value,
            pageSize: pageSize.value,
          }
        });

        if (currentPage.value === 1) {
          posts.value = response.data.content;
        } else {
          posts.value.push(...response.data.content);
        }

        totalPages.value = response.data.pageData.totalPages;
        currentPage.value++;
      } catch (error) {
        console.error('Failed to fetch tech blog posts:', error);
      } finally {
        loading.value = false;
        isFetching.value = false;
      }
    };

    watch(() => eventBus.searchQuery, (newQuery) => {
      searchQuery.value = newQuery;
      currentPage.value = 1;
      fetchPosts();
    });

    onMounted(() => {
      fetchPosts();
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const getCompanyLogo = (techBlogEnum: string) => {
      const logoMap: { [key: string]: string } = {
        KAKAO: kakaoLogo,
        NAVER: naverLogo,
      };
      return logoMap[techBlogEnum] || '@/assets/log.svg';
    };

    return { posts, loading, getCompanyLogo };
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Spoqa+Han+Sans:wght@400;700&display=swap');

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  font-family: 'Spoqa Han Sans', sans-serif; /* 스포카한산스 적용 */
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #888;
}

.posts-container {
  margin-bottom: 30px;
}

.post-row {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s;
}


.row-content {
  display: flex;
  align-items: center;
  margin: 2px 0;
  width: 100%;
}

.post-details {
  flex-grow: 1; /* 나머지 공간을 차지하게 설정 */
}

.card-title {
  font-size: 1.4em; /* 제목 크기 조정 */
  margin: 0;
  letter-spacing: -0.8px; /* 글자 간격 조정 */
}

.card-title a {
  text-decoration: none;
  font-weight: 500; /* 볼드 효과 적용 */
  color: inherit;
}

.card-title a:hover {
  color: #1a73e8;
}

.company-info {
  display: flex;
  align-items: center;
  margin-top: 5px; /* 제목과 회사 정보 간격 조정 */
  justify-content: space-between; /* 양쪽 끝으로 정렬 */
}

.company-logo {
  width: 25px; /* 로고 크기를 현재의 절반으로 조정 */
  height: auto; /* 높이를 자동으로 설정 */
  margin-right: 10px; /* 로고와 회사 이름 간격 조정 */
}

.card-company {
  font-size: 1em; /* 회사명 크기 조정 */
  color: #333;
  letter-spacing: 0; /* 글자 간격 조정 */
}

.card-date {
  font-size: 1em; /* 날짜 크기 조정 */
  color: #666;
  margin-left: auto; /* 날짜를 우측으로 정렬 */
  letter-spacing: 0; /* 글자 간격 조정 */
}
</style>
