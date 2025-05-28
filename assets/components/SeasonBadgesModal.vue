<script setup>
import { ref, watch } from 'vue';
import { Leagues } from '@/api/index.js';
import IconView from '@/icons/view.svg';

const props = defineProps({
  leagueId: {
    type: [String, Number],
    required: true,
  },
});

const seasons = ref(null);
const isLoading = ref(false);
const modalOpen = ref(false);

const fetchSeasons = async () => {
  isLoading.value = true;
  try {
    const { data } = await Leagues.getSelectedSeasonsBadges({ badge: 1, id: props.leagueId });
    seasons.value = data.seasons || [];
  } catch (error) {
    console.error(error);
    seasons.value = [];
  } finally {
    isLoading.value = false;
  }
};

const handleChange = (event) => {
  modalOpen.value = event.target.checked;
  if (modalOpen.value) {
    fetchSeasons();
  } else {
    // Reset seasons when modal closes
    seasons.value = null;
  }
};

// Watch for leagueId changes to reset the state
watch(
  () => props.leagueId,
  () => {
    seasons.value = null;
    modalOpen.value = false;
  },
);
</script>

<template>
  <label :for="`modal_${leagueId}`" class="btn gap-0 btn-xs btn-primary"
    ><IconView class="h-4" /> Badges</label
  >

  <input :id="`modal_${leagueId}`" type="checkbox" class="modal-toggle" @change="handleChange" />
  <div class="modal" role="dialog">
    <div class="modal-box max-w-5xl">
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
            <img
              :src="season.strBadge"
              :alt="season.strSeason"
              class="h-24 w-24 object-contain"
              @error="
                $event.target.src =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNDgiIHk9IjQ4IiBkeT0iLjFlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM5Y2EzYWYiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
              "
            />
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
