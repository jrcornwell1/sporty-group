import { useFuse } from '@vueuse/integrations/useFuse';

const defaultOptions = {
  fuseOptions: {
    threshold: 0.3, // More lenient matching
    ignoreLocation: true, // Search the entire string
    findAllMatches: true, // Find all matches
    useExtendedSearch: true,
    minMatchCharLength: 1,
    keys: [''],
    matchAllOnEmptyQuery: true,
    includeMatches: true,
    ignoreCase: true, // Case insensitive
    includeScore: true, // Include score in results
  },
};

export default (input, items, keys = []) => {
  const options = {
    ...defaultOptions,
    fuseOptions: {
      ...defaultOptions.fuseOptions,
      keys: [...defaultOptions.fuseOptions.keys, ...keys].filter(Boolean),
    },
  };

  const { results } = useFuse(input, items, options);

  return { results };
};
