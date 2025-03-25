<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-4 max-w-md mx-auto p-4 sm:p-6"
  >
    <div>
      <label class="block text-sm sm:text-lg font-medium">Title</label>
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
      :disabled="loading"
      class="w-full cursor-pointer rounded bg-blue-600 p-2 sm:p-3 text-white text-sm sm:text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span
        v-if="loading"
        class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"
      ></span>
      <span>{{
        loading ? "Processing..." : localTrip.id ? "Update Trip" : "Add Trip"
      }}</span>
    </button>
  </form>
</template>

<script setup>
import { useModalStore } from "@/stores/modalStore";
import { useTripsStore } from "@/stores/tripStore";
import { computed, reactive, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const { addTrip, updateTrip } = useTripsStore();
const { closeModal, selectedTrip } = useModalStore();

const localTrip = reactive({
  title: "",
  description: "",
  destination: "",
  startDate: "",
  endDate: "",
  price: "",
});

const loading = ref(false);

watch(
  () => selectedTrip,
  async (newTrip) => {
    if (newTrip) {
      Object.assign(localTrip, newTrip);
    } else {
      Object.assign(localTrip, {
        title: "",
        description: "",
        destination: "",
        startDate: "",
        endDate: "",
        price: "",
      });
    }
  },
  { immediate: true, deep: true }
);

const minDate = computed(() => {
  return new Date().toISOString().split("T")[0];
});

const handleSubmit = async () => {
  if (loading.value) return; // Prevent multiple submissions
  loading.value = true;

  try {
    if (localTrip.id) {
      await updateTrip(selectedTrip.id, localTrip);
      toast.success("Trip updated successfully", { autoClose: 3000 });
    } else {
      await addTrip(localTrip);
      toast.success("Trip added successfully", { autoClose: 3000 });
    }
    closeModal();
  } catch (error) {
    console.log({ error });
    toast.error("An error occurred. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>
