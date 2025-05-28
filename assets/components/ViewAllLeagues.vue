<script setup>
import { Leagues } from '@/api/index.js';
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import IconSearch from '@/icons/search.svg';
import AppTable from '@/components/AppTable.vue';
import useSearch from '@/composables/useSearch.js';
import useFiltering from '@/composables/useFiltering.js';
import SeasonBadgesModal from './SeasonBadgesModal.vue';
import AppPageLoader from '@/components/AppPageLoader.vue';

const input = ref('');
const selectedSport = ref('');

const { data, isLoading } = useQuery({
  queryKey: ['leagues'],
  queryFn: async () => {
    const { data } = await Leagues.getAllLeagues();
    return data.leagues;
  },
});

const leagues = computed(() => data.value || []);

const { results } = useSearch(input, leagues, ['strLeague', 'strLeagueAlternate']);

const hasLeagueAlternate = (league) => {
  return league !== '' ? league : 'N/A';
};

const { filteredItems, availableFilters } = useFiltering(
  leagues,
  'strSport',
  selectedSport,
  results,
  input,
);
</script>

<template>
  <AppPageLoader v-if="isLoading" />

  <template v-else>
    <div class="mb-4 flex gap-4">
      <label class="input flex-1">
        <IconSearch />
        <input v-model="input" type="search" placeholder="Search..." />
      </label>

      <select v-model="selectedSport" class="select-bordered select">
        <option value="">All Sports</option>
        <option v-for="sport in availableFilters" :key="sport" :value="sport">
          {{ sport }}
        </option>
      </select>
    </div>

    <AppTable :results="filteredItems">
      <template #head>
        <th>League</th>
        <th>Sport</th>
        <th>League Alternate</th>
        <th />
      </template>
      <template #row="{ item }">
        <td>
          <div class="font-bold">{{ item.strLeague }}</div>
        </td>

        <td>
          <span class="badge badge-ghost badge-sm">
            {{ item.strSport }}
          </span>
        </td>
        <td>
          {{ hasLeagueAlternate(item.strLeagueAlternate) }}
        </td>
        <th>
          <SeasonBadgesModal :league-id="item.idLeague" />
        </th>
      </template>
      <template #empty>
        <tr>
          <td colspan="5" class="py-4 text-center">
            <div class="flex flex-col items-center gap-2">
              <span class="text-gray-500 text-lg font-semibold">No leagues found</span>
              <span class="text-gray-400 text-sm">Try adjusting your search or filters</span>
            </div>
          </td>
        </tr>
      </template>
    </AppTable>
  </template>
</template>

<style scoped></style>
