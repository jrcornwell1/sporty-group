<script setup>
import { Leagues } from '@/api/index.js';
import { ref } from 'vue';
import IconSearch from '@/icons/search.svg';
import AppTable from '@/components/AppTable.vue';
import useSearch from '@/composables/useSearch.js';
import useFiltering from '@/composables/useFiltering.js';
import SeasonBadgesModal from './SeasonBadgesModal.vue'; // Create this component in your components directory

const input = ref('');
const leagues = ref([]);
const selectedSport = ref(''); // New ref for sport filter

const { results } = useSearch(input, leagues, ['strLeague', 'strLeagueAlternate']);

const fetchAllLeagues = async () => {
  try {
    const { data } = await Leagues.getAllLeagues();
    leagues.value = data.leagues;
  } catch (error) {
    console.error(error);
  } finally {
    //
  }
};

fetchAllLeagues();

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

<style scoped></style>
