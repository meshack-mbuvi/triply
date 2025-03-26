<template>
  <div class="relative">
    <select
      v-model="selectedSortOrder"
      @change="emitSortChange"
      class="border border-gray-300 rounded-lg p-2"
    >
      <option value="ASC">Ascending (A-Z)</option>
      <option value="DESC">Descending (Z-A)</option>
    </select>
  </div>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const selectedSortOrder = ref("ASC");

const emit = defineEmits(["sort-change"]);

const emitSortChange = () => {
  emit("sort-change", selectedSortOrder.value);
};
</script>
