<template>
  <div class="flex flex-wrap gap-4 items-center">
    <!-- Destination -->
    <input
      v-model="localFilters.destination"
      class="rounded border border-gray-300 p-2"
      type="text"
      placeholder="Destination"
    />

    <!-- Start Date -->
    <input
      v-model="localFilters.startDate"
      type="date"
      class="rounded border border-gray-300 p-2"
      placeholder="Start date"
    />

    <!-- End Date -->
    <input
      v-model="localFilters.endDate"
      type="date"
      class="rounded border border-gray-300 p-2"
      placeholder="End date"
    />

    <!-- Max Price -->
    <input
      v-model="localFilters.maxPrice"
      type="number"
      min="0"
      placeholder="Max Price"
      class="rounded border border-gray-300 p-2"
    />

    <!-- Apply Filters -->
    <button
      @click="applyFilters"
      class="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg"
    >
      Apply Filters
    </button>

    <!-- Reset Filters -->
    <button
      @click="resetFilters"
      class="bg-gray-300 cursor-pointer text-gray-800 px-4 py-2 rounded-lg"
    >
      Reset
    </button>
  </div>
</template>

<script setup>
import { useTripsStore } from "@/stores/tripStore";
import { reactive } from "vue";

const { tripFilters, updateFilters } = useTripsStore();

// Create a local copy of filters to avoid modifying store directly
const localFilters = reactive({
  ...tripFilters,
  startDate: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
  endDate: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
});

// Apply filters by updating the Pinia store
const applyFilters = () => {
  updateFilters(localFilters);
};

// Reset filters
const resetFilters = () => {
  Object.assign(localFilters, {
    destination: "",
    startDate: "",
    endDate: "",
    maxPrice: "",
  });
  applyFilters();
};
</script>
