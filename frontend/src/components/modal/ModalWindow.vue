<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/10 backdrop-invert backdrop-opacity-10"
    aria-modal="true"
    role="dialog"
    tabindex="-1"
  >
    <div class="relative w-11/12 max-w-lg rounded-lg bg-white p-6">
      <ModalCloseButton
        @click="store.closeModal"
        class="absolute right-4 top-4 cursor-pointer"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modalStore.js";
import ModalCloseButton from "./ModalCloseButton.vue";

const store = useModalStore();
</script>
