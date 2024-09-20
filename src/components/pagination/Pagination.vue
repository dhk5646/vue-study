<template>
  <div class="pagination">
    <!-- 첫 페이지로 이동 버튼 -->
    <button
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="goToPreviousSet"
    >
      &laquo;
    </button>

    <!-- 이전 페이지로 이동 버튼 -->
    <button
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="goToPreviousPage"
    >
      &lsaquo;
    </button>

    <!-- 페이지 번호 버튼 -->
    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination-button"
      :class="{ active: page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <!-- 다음 페이지로 이동 버튼 -->
    <button
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="goToNextPage"
    >
      &rsaquo;
    </button>

    <!-- 마지막 페이지로 이동 버튼 -->
    <button
      class="pagination-button"
      :disabled="lastVisiblePage >= totalPages"
      @click="goToNextSet"
    >
      &raquo;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    visiblePageCount: {
      type: Number,
      default: 5, // 한 번에 보여줄 페이지 버튼 수
    },
  },
  emits: ['updatePage'],
  computed: {
    visiblePages() {
      const startPage = Math.max(
        1,
        Math.min(
          this.currentPage - Math.floor(this.visiblePageCount / 2),
          this.totalPages - this.visiblePageCount + 1
        )
      );
      const endPage = Math.min(
        startPage + this.visiblePageCount - 1,
        this.totalPages
      );
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
    lastVisiblePage() {
      return this.visiblePages[this.visiblePages.length - 1];
    },
  },
  methods: {
    changePage(page: number) {
      this.$emit('updatePage', page);
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.$emit('updatePage', this.currentPage - 1);
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('updatePage', this.currentPage + 1);
      }
    },
    goToPreviousSet() {
      const newPage = this.currentPage - this.visiblePageCount;
      this.$emit('updatePage', newPage < 1 ? 1 : newPage);
    },
    goToNextSet() {
      const newPage = this.currentPage + this.visiblePageCount;
      this.$emit('updatePage', newPage > this.totalPages ? this.totalPages : newPage);
    },
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-button {
  background-color: #f1f1f1;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
}

.pagination-button.active {
  background-color: #1a73e8;
  color: #fff;
  font-weight: bold;
}

.pagination-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
