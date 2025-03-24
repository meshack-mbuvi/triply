<template>
  <div class="container mx-auto p-6 py-4">
    <Loader v-if="isLoading" />
    <div
      v-if="trips.trips.length === 0 && !isLoading"
      class="flex flex-col justify-center items-center space-y-8 py-16"
    >
      <p class="text-2xl text-gray-900 transition animate-bounce">
        No trips. Please click the button below to add a trip
      </p>
      <button
        @click="openModal"
        class="max-w-xl sm:w-auto flex cursor-pointer items-center justify-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95"
      >
        <span class="text-lg font-semibold">+ Add Trip</span>
      </button>
    </div>

    <div
      v-if="trips.trips.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
    >
      <TripCard v-for="trip in trips.trips" :key="trip.id" :trip="trip" />
    </div>

    <!-- Modal to add new trip -->
    <ModalWindow v-if="isOpen">
      <TripForm />
    </ModalWindow>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modalStore";
import { useTripsStore } from "@/stores/tripStore";
import { onMounted } from "vue";
import Loader from "../ui/Loader.vue";
import TripCard from "./TripCard.vue";

const { trips, getTrips, isLoading } = useTripsStore();
const { openModal, isOpen } = useModalStore();

onMounted(() => {
  getTrips();
});
</script>
