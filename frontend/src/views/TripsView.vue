<template>
  <div class="flex flex-col items-center min-h-screen">
    <Navbar />

    <div class="flex justify-between items-center my-8">
      <!-- Right Side -->
      <div class="flex items-center">
        <button
          @click="store.openModal"
          class="ml-3 flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95"
        >
          <span class="text-lg font-semibold">+ Add Trip</span>
        </button>
      </div>
    </div>
    <TripGrid />
    <ModalWindow v-if="store.isOpen">
      <TripForm />
    </ModalWindow>
  </div>
</template>

<script setup>
import ModalWindow from "@/components/modal/ModalWindow.vue";
import Navbar from "@/components/Navbar.vue";
import TripForm from "@/components/trips/TripForm.vue";
import TripGrid from "@/components/trips/TripGrid.vue";
import { useModalStore } from "@/stores/modalStore";

const store = useModalStore();
</script>
