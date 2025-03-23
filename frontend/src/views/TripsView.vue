<template>
  <div class="flex flex-col items-center min-h-screen">
    <Navbar />

    <div class="flex justify-between items-center my-8">
      <!-- Right Side -->
      <div class="flex items-center">
        <button
          @click="store.openModal"
          class="ml-3 cursor-pointer bg-gray-200 text-gray-700 px-4 py-4 rounded-lg hover:bg-gray-300"
        >
          + Add Trip
        </button>
      </div>
    </div>

    <TripGrid />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import TripGrid from "@/components/trips/TripGrid.vue";
</script>
