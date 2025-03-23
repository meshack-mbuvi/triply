<template>
  <div class="container mx-auto p-6">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
    >
      <TripCard v-for="trip in trips.trips" :key="trip.id" :trip="trip" />
    </div>
  </div>
</template>

<script setup>
import { useTripsStore } from "@/stores/tripStore";
import { onMounted } from "vue";
import TripCard from "./TripCard.vue";

const { trips, getTrips } = useTripsStore();

onMounted(() => {
  getTrips();
});
</script>
