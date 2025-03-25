<script setup>
import { computed } from "vue";
import Navbar from "./components/Navbar.vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center min-h-screen">
      <Navbar />

      <router-view :key="$route.path" />
      <footer class="text-center mt-8 text-gray-500 text-sm py-4">
        © {{ currentYear }} Meshack Mbuvi. All rights reserved.
      </footer>
    </div>
  </div>
</template>
