import { useFuse } from '@vueuse/integrations/useFuse';

const defaultOptions = {
  fuseOptions: {
    threshold: 0.3,
    ignoreLocation: true,
    findAllMatches: true,
    useExtendedSearch: true,
    minMatchCharLength: 1,
    keys: [''],
    matchAllOnEmptyQuery: true,
    includeMatches: true,
    ignoreCase: true,
    includeScore: true,
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
