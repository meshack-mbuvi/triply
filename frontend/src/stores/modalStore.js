import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const selectedTrip = ref(null); // Use ref() instead of reactive()

  function openModal(trip) {
    isOpen.value = true;
    selectedTrip.value = { ...trip }; // Clone to ensure reactivity
  }

  function closeModal() {
    isOpen.value = false;
    selectedTrip.value = null; // Reset when closing
  }

  return {
    isOpen,
    openModal,
    closeModal,
    selectedTrip,
  };
});
