<template>
  <div>
    <div
      v-if="trips.trips.length > 0"
      class="flex flex-wrap items-center border-b border-gray-300 justify-between w-full p-4 gap-4 sm:flex-row"
    >
      <!-- Filter section -->
      <FilterTrip class="w-full sm:w-auto" />

      <!-- Right Side -->
      <button
        @click="store.openModal"
        class="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95"
      >
        <span class="text-lg font-semibold">+ Add Trip</span>
      </button>
    </div>

    <!-- List Trips -->
    <TripGrid />

    <!-- Modal to add new trip -->
    <ModalWindow v-if="store.isOpen">
      <TripForm />
    </ModalWindow>
  </div>
</template>

<script setup>
import ModalWindow from "@/components/modal/ModalWindow.vue";
import FilterTrip from "@/components/trips/FilterTrip.vue";
import TripForm from "@/components/trips/TripForm.vue";
import TripGrid from "@/components/trips/TripGrid.vue";
import { useModalStore } from "@/stores/modalStore";
import { useTripsStore } from "@/stores/tripStore";

const store = useModalStore();
const { trips } = useTripsStore();
</script>
