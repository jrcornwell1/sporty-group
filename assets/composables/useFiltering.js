import { computed } from 'vue';
/**
 *
 * @param items
 * @param filterKey
 * @param filterValue
 * @param searchResults
 * @param searchInput
 */
export default function useFiltering(
  items,
  filterKey,
  filterValue,
  searchResults = null,
  searchInput = null,
) {
  // Get unique values for filter dropdown
  const availableFilters = computed(() => {
    const values = new Set(items.value.map((item) => item[filterKey]));
    return Array.from(values);
  });

  // Combined computed property for both search and filtering
  const filteredItems = computed(() => {
    let filtered = items.value;

    // First apply filter if selected
    if (filterValue.value) {
      filtered = filtered.filter((item) => item[filterKey] === filterValue.value);
    }

    // Then apply search if there's input and search results
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
}
