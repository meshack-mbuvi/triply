<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center min-h-screen">
      <Navbar />

      <router-view :key="$route.path" />
    </div>
  </div>
</template>
