<script setup>
import { ref, toRefs, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Leagues } from '@/api/index.js';

const props = defineProps({
  leagueId: {
    type: [String, Number],
    required: true,
  },
});

const { leagueId } = toRefs(props);
const modalOpen = ref(false);
const lastFetchedId = ref(null);

const {
  data: seasons,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ['seasons', leagueId.value],
  queryFn: async () => {
    const { data } = await Leagues.getSelectedSeasonsBadges({
      badge: 1,
      id: leagueId.value,
    });
    return data.seasons || [];
  },
  enabled: false,
  staleTime: Infinity, // Keep infinite staleTime for caching
  cacheTime: 1000 * 60 * 30,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
});

const handleChange = async (event) => {
  modalOpen.value = event.target.checked;
  if (modalOpen.value) {
    // Only refetch if we're looking at a different league or don't have data
    if (lastFetchedId.value !== leagueId.value || !seasons?.value?.length) {
      await refetch();
      lastFetchedId.value = leagueId.value;
    }
  }
};

watch(
  () => leagueId.value,
  () => {
    modalOpen.value = false;
  },
);
</script>

<template>
  <label :for="`modal_${leagueId}`" class="btn gap-0 btn-xs btn-primary"> Badges</label>

  <input :id="`modal_${leagueId}`" type="checkbox" class="modal-toggle" @change="handleChange" />
  <div class="modal" role="dialog">
    <div class="modal-box max-w-5xl bg-grey-100">
      <!-- Close button -->
      <label
        :for="`modal_${leagueId}`"
        class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm"
      >
        ✕
      </label>

      <h3 class="text-lg font-bold">Season Badges</h3>

      <div v-if="isLoading" class="flex justify-center p-8">
        <span class="loading loading-lg loading-spinner" />
      </div>

      <div
        v-else-if="seasons && seasons.length > 0"
        class="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4"
      >
        <div
          v-for="season in seasons"
          :key="season.strSeason"
          class="flex flex-col items-center gap-2"
        >
          <template v-if="season.strBadge">
            <img :src="season.strBadge" :alt="season.strSeason" class="h-24 w-24 object-contain" />
          </template>
          <template v-else>
            <div
              class="bg-gray-100 text-gray-400 flex h-24 w-24 items-center justify-center text-sm"
            >
              No Badge
            </div>
          </template>
          <span class="text-sm font-medium">{{ season.strSeason }}</span>
        </div>
      </div>

      <div v-else class="py-8 text-center">
        <div class="flex flex-col items-center gap-2">
          <span class="text-gray-500 text-lg font-semibold">No seasons found</span>
          <span class="text-gray-400 text-sm">This league has no season badges available</span>
        </div>
      </div>
    </div>
    <label class="modal-backdrop" :for="`modal_${leagueId}`">Close</label>
  </div>
</template>
