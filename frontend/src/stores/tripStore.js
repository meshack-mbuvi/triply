import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useTripsStore = defineStore("trips", () => {
  const isLoading = ref(false);

  const trips = reactive({
    trips: [],
    total: 0,
    page: 1,
    totalPages: 1,
    error: { message: "", errors: {} },
  });

  const tripFilters = reactive({
    destination: "",
    startDate: "",
    endDate: "",
  });

  // Fetch trips
  const getTrips = async (page, limit) => {
    try {
      isLoading.value = true;
      const url = `trips?page=${page}&limit=${limit}`;
      const data = await fetchWithAuth(url);
      Object.assign(trips, data);
    } catch (err) {
      trips.error.message = err.message;
      console.error("Error fetching trips:", err);
    } finally {
      isLoading.value = false;
    }
  };

  // Add a new trip
  const addTrip = async (trip) => {
    try {
      await fetchWithAuth(`trips`, {
        method: "POST",
        body: JSON.stringify(trip),
      });
      await getTrips(); // Refresh list after adding
    } catch (err) {
      console.error("Error adding trip:", err);
    }
  };

  const updateTrip = async (id, updatedTrip) => {
    try {
      await fetchWithAuth(`trips/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedTrip),
      });
      await getTrips(); // Refresh list after adding
    } catch (err) {
      console.error("Error adding trip:", err);
    }
  };

  // Delete a trip
  const deleteTrip = async (id) => {
    try {
      await fetchWithAuth(`trips/${id}`, { method: "DELETE" });
      await getTrips(); // Refresh list after deletion
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  // Build query string for filters
  const buildQueryString = (filters) => {
    return new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
    ).toString();
  };

  /**
   * Filters trips based on provided filters and updates the trips list.
   *
   * @param {Object} newFilters - The filters to apply when fetching trips.
   * @param {string} [newFilters.destination] - Destination to filter by.
   * @param {string} [newFilters.startDate] - Start date for filtering trips.
   * @param {string} [newFilters.endDate] - End date for filtering trips.
   * @param {number} [newFilters.maxPrice] - Maximum price filter.
   * @returns {Promise<void>} Resolves when the trips list is updated.
   */
  const updateFilters = async (newFilters) => {
    try {
      isLoading.value = true;
      const queryString = buildQueryString(newFilters);
      const data = await fetchWithAuth(`trips/filter?${queryString}`);
      Object.assign(trips, data);
    } catch (err) {
      trips.error.message = err.message;
      console.error("Error applying filters:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    trips,
    getTrips,
    isLoading,
    addTrip,
    deleteTrip,
    tripFilters,
    updateFilters,
    updateTrip,
  };
});
