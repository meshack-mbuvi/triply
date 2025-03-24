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
        <div class="flex items-center mt-2 justify-between">
          <p class="text-xl font-bold text-green-600">${{ trip.price }}</p>
          <button
            @click="handleDelete(trip.id)"
            class="ml-2 text-red-500 cursor-pointer hover:text-red-700 transition"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTripsStore } from "@/stores/tripStore";
import { Trash2 as TrashIcon } from "lucide-vue-next";
import { toast } from "vue3-toastify";

const props = defineProps(["trip"]);
const { deleteTrip } = useTripsStore();

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const handleDelete = async (id) => {
  try {
    await deleteTrip(id);
    toast.success("Trip deleted successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Failed to delete trip", { autoClose: 3000 });
    console.error(error);
  }
};
</script>
