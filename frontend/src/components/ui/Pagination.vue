<template>
  <div class="flex items-center justify-center space-x-2 mt-4">
    <!-- Previous Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 cursor-pointer text-sm bg-gray-200 rounded disabled:opacity-50"
    >
      Previous
    </button>

    <!-- Page Numbers -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'px-3 py-2 text-sm rounded',
        page === currentPage
          ? 'cursor-pointer bg-blue-500 text-white'
          : 'bg-gray-200',
      ]"
    >
      {{ page }}
    </button>

    <!-- Next Button -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-2 cursor-pointer disabled:cursor-not-allowed text-sm bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  itemsPerPage: { type: Number, default: 5 },
});

const emit = defineEmits(["page-change"]);

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
  }
};
</script>
