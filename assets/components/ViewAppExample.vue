<script setup>
import { Leagues } from '@/api/index.js';
import { ref } from 'vue';
import IconView from '@/icons/view.svg';
import AppTable from '@/components/AppTable.vue';

const leagues = ref();

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
</script>

<template>
  <AppTable :results="leagues">
    <template #head>
      <th>League</th>
      <th>Sport</th>
      <th>League Alternate</th>
      <th />
    </template>
    <template #row="{ item }">
      <td>
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask h-12 w-12 mask-squircle">
              <img
                src="https://www.thesportsdb.com/images/media/league/badgearchive/vrz3zg1718956550.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <div class="font-bold">{{ item.strLeague }}</div>
          </div>
        </div>
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
        <button class="btn gap-0 btn-xs btn-primary"><IconView class="h-4" /> View</button>
      </th>
    </template>
  </AppTable>
</template>

<style scoped></style>
