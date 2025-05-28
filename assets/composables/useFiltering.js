import { computed } from 'vue';

export default (items, filterKey, filterValue, searchResults = null, searchInput = null) => {
  const availableFilters = computed(() => {
    const values = new Set(items.value.map((item) => item[filterKey]));
    return Array.from(values);
  });

  const filteredItems = computed(() => {
    let filtered = items.value;

    if (filterValue.value) {
      filtered = filtered.filter((item) => item[filterKey] === filterValue.value);
    }

    if (searchInput?.value && searchResults?.value) {
      return searchResults.value
        .map((result) => result.item)
        .filter((item) => !filterValue.value || item[filterKey] === filterValue.value);
    }

    return filtered;
  });

  return {
    availableFilters,
    filteredItems,
  };
};
