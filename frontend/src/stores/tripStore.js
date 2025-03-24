import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useTripsStore = defineStore("trips", () => {
  const trips = reactive({
    trips: [],
    total: 0,
    page: 1,
    totalPages: 1,
    error: { message: "", errors: {} },
  });

  const isLoading = ref(false);

  const router = useRouter();

  const setIsLoading = (loading) => (isLoading.value = loading);

  const getTrips = async () => {
    try {
      setIsLoading(true);

      // Retrieve auth token from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        setIsLoading(false);

        router.push("/login");
        return;
      }

      const response = await fetch(`${BASE_URL}/api/trips`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      // Handle unauthenticated user
      if (response.status === 401) {
        // Remove user from local storage
        localStorage.removeItem("user");

        // redirect to login
        router.push("/login");

        return;
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        tripsData.error = {
          message: errorResponse.message || "Failed to fetch trips",
          errors: errorResponse.errors || {},
        };
        throw new Error(errorResponse.message);
      }

      const data = await response.json();

      // Update reactive state with API response
      trips.trips = data.trips;
      trips.total = data.total;
      trips.page = data.page;
      trips.totalPages = data.totalPages;
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      console.error("Unable to fetch trips:", err);
      trips.error.message = err.message;

      setTimeout(() => {
        trips.error = { message: "", errors: {} };
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const addTrip = async (trip) => {
    try {
      // Retrieve auth token from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        setIsLoading(false);

        router.push("/login");
        router.go();
        return;
      }

      const response = await fetch(`${BASE_URL}/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(trip),
      });

      // Handle unauthenticated user
      if (response.status === 401) {
        // Remove user from local storage
        localStorage.removeItem("user");

        // redirect to login
        router.push("/login");

        return;
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        tripsData.error = {
          message: errorResponse.message || "Failed to fetch trips",
          errors: errorResponse.errors || {},
        };
        throw new Error(errorResponse.message);
      }

      await response.json();

      // Refetch trips
      await getTrips();
    } catch (err) {
      console.log({ err });
    }
  };

  return {
    trips,
    getTrips,
    isLoading,
    addTrip,
  };
});
