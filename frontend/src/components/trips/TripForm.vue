<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-4 max-w-md mx-auto p-4 sm:p-6"
  >
    <div>
      <label class="block text-sm sm:text-lg font-medium" for="">Title</label>
      <input
        v-model="localTrip.title"
        type="text"
        class="w-full rounded p-2 sm:p-3 border border-gray-300"
        required
      />
    </div>

    <div>
      <label class="block text-sm sm:text-lg font-medium">Description</label>
      <textarea
        v-model="localTrip.description"
        class="w-full rounded border border-gray-300 p-2 sm:p-3"
        required
      ></textarea>
    </div>
    <div>
      <label class="block text-sm sm:text-lg font-medium">Destination</label>
      <input
        v-model="localTrip.destination"
        type="text"
        class="w-full rounded border border-gray-300 p-2 sm:p-3"
        required
      />
    </div>
    <div>
      <label class="block text-sm sm:text-lg font-medium">Start Date</label>
      <input
        v-model="localTrip.startDate"
        type="date"
        class="w-full rounded border border-gray-300 p-2 sm:p-3"
        :min="minDate"
        required
      />
    </div>
    <div>
      <label class="block text-sm sm:text-lg font-medium">End Date</label>
      <input
        v-model="localTrip.endDate"
        type="date"
        class="w-full rounded border border-gray-300 p-2 sm:p-3"
        :min="localTrip.startDate"
        required
      />
    </div>
    <div>
      <label class="block text-sm sm:text-lg font-medium">Price</label>
      <input
        v-model="localTrip.price"
        type="number"
        min="0"
        class="w-full rounded border border-gray-300 p-2 sm:p-3"
        required
      />
    </div>
    <button
      type="submit"
      class="w-full rounded bg-blue-600 p-2 sm:p-3 text-white text-sm sm:text-lg"
    >
      Add Trip
    </button>
  </form>
</template>

<script setup>
import { useModalStore } from "@/stores/modalStore";
import { useTripsStore } from "@/stores/tripStore";
import { computed, reactive } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const localTrip = reactive({
  title: "",
  description: "",
  destination: "",
  startDate: "",
  endDate: "",
  price: "",
});

const minDate = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return today;
});

const { addTrip } = useTripsStore();
const { closeModal } = useModalStore();

// Create a new trip
const handleSubmit = async () => {
  try {
    await addTrip(localTrip);

    // show success message
    toast.success("Trip added successfully", {
      autoClose: 3000,
    });

    closeModal();
  } catch (error) {
    console.log({ error });
  }
};
</script>
