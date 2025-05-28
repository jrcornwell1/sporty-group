<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  results: { type: Array, default: () => [] },
});

const { results } = toRefs(props);
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
        <!-- row 1 -->
        <tr v-for="(item, index) in results" :key="item.id">
          <slot name="row" :item="item" :index="index" />
        </tr>
      </tbody>
      <!-- foot -->
    </table>
  </div>
</template>

<style scoped></style>
