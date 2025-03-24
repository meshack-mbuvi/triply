import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useTripsStore = defineStore("trips", () => {
  const router = useRouter();
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

  // Get user token from localStorage
  const getUserToken = () => {
    return JSON.parse(localStorage.getItem("user"))?.token || null;
  };

  // Fetch wrapper with authentication
  const fetchWithAuth = async (url, options = {}) => {
    const token = getUserToken();
    if (!token) {
      router.push("/login");
      throw new Error("User not authenticated");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem("user");
      router.push("/login");
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Request failed");
    }

    return response.json();
  };

  // Fetch trips
  const getTrips = async () => {
    try {
      isLoading.value = true;
      const data = await fetchWithAuth(`${BASE_URL}/api/trips`);
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
      await fetchWithAuth(`${BASE_URL}/api/trips`, {
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
      await fetchWithAuth(`${BASE_URL}/api/trips/${id}`, {
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
      await fetchWithAuth(`${BASE_URL}/api/trips/${id}`, { method: "DELETE" });
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
      const data = await fetchWithAuth(
        `${BASE_URL}/api/trips/filter?${queryString}`
      );
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
