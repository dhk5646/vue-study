import { reactive } from 'vue';

const eventBus = reactive({
  searchQuery: '',
  setSearchQuery(query: string) {
    this.searchQuery = query;
  },
});

export default eventBus;