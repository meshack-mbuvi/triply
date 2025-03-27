<template>
  <div class="container mx-auto p-6 py-4 space-y-10">
    <Loader v-if="isLoading" />

    <!-- Sort Component -->
    <div class="flex justify-end">
      <SortDropdown @sort-change="handleSortChange" />
    </div>

    <!-- No Trips Message -->
    <div
      v-if="trips.trips.length === 0 && !isLoading"
      class="flex flex-col justify-center items-center space-y-8 py-16"
    >
      <p class="text-2xl text-gray-800 transition animate-pulse">
        No trips available. Click the button below to add your first trip or
        adjust your filters to find matching trips!
      </p>
      <button
        @click="openModal"
        class="max-w-xl sm:w-auto flex cursor-pointer items-center justify-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95"
      >
        <span class="text-lg font-semibold">+ Add Trip</span>
      </button>
    </div>

    <!-- Trip List -->
    <div
      v-if="trips.trips.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
    >
      <TripCard v-for="trip in trips.trips" :key="trip.id" :trip="trip" />
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="trips.total > itemsPerPage"
      :currentPage="currentPage"
      :totalPages="trips.totalPages"
      :itemsPerPage="itemsPerPage"
      @page-change="handlePageChange"
    />

    <!-- Modal to add new trip -->
    <ModalWindow v-if="isOpen">
      <TripForm />
    </ModalWindow>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modalStore";
import { useTripsStore } from "@/stores/tripStore";
import { onMounted, ref } from "vue";
import Loader from "../ui/Loader.vue";
import Pagination from "../ui/Pagination.vue";
import SortDropdown from "../ui/SortDropdown.vue"; // Import Sort Component
import TripCard from "./TripCard.vue";

const { trips, getTrips, isLoading } = useTripsStore();
const { openModal, isOpen } = useModalStore();

const currentPage = ref(1);
const itemsPerPage = 8;
const sortOrder = ref("ASC"); // Default sorting: Ascending order

// Fetch trips when the component mounts
onMounted(async () => {
  await fetchTrips();
});

// Fetch trips with current state
const fetchTrips = async () => {
  await getTrips(currentPage.value, itemsPerPage, sortOrder.value);
};

// Fetch trips when a new page is selected
const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchTrips();
};

// Handle sort change event
const handleSortChange = async (order) => {
  sortOrder.value = order;
  await fetchTrips();
};
</script>
