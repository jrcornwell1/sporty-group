<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  results: { type: Array, default: () => [] },
});

const { results } = toRefs(props);

const isEmpty = computed(() => results.value.length === 0);
</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <slot name="head" />
        </tr>
      </thead>
      <tbody>
        <!-- If there are results, show them -->
        <template v-if="!isEmpty">
          <tr v-for="(item, index) in results" :key="item.id">
            <slot name="row" :item="item" :index="index" />
          </tr>
        </template>
        <!-- If no results, show empty state -->
        <template v-else>
          <slot name="empty">
            <tr>
              <td :colspan="$slots.head?.().length || 1" class="py-4 text-center">
                <div class="flex flex-col items-center gap-2">
                  <span class="text-gray-500 text-lg font-semibold">No results found</span>
                  <span class="text-gray-400 text-sm">Try adjusting your search or filters</span>
                </div>
              </td>
            </tr>
          </slot>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
