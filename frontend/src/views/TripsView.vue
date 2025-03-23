<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <h1 class="text-3xl font-bold">
      Welcome, {{ authStore.user?.fullName || "Guest" }}!
    </h1>
    <p class="text-gray-700">You are logged in.</p>

    <button
      @click="handleLogout"
      class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.user = null;
  authStore.isAuthenticated = false;
  router.push("/login");
};
</script>
