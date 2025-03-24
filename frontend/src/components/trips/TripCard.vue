<template>
  <div
    class="max-w-3xl h-fit mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
  >
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-800">{{ trip.title }}</h2>
      <p class="text-gray-500 mt-2">{{ trip.description }}</p>
      <div class="mt-4">
        <p class="text-lg font-semibold text-blue-600">
          {{ trip.destination }}
        </p>
        <p class="flex flex-col text-sm text-gray-600">
          <span class="font-medium"
            >{{ formatDate(trip.startDate) }} -
            {{ formatDate(trip.endDate) }}</span
          >
        </p>
        <p class="text-xl font-bold text-green-600 mt-2">${{ trip.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["trip"]);
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>
