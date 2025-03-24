<script setup>
import { LogOut, Menu, User, X } from "lucide-vue-next";
import { ref } from "vue";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const { user } = useAuthStore();
const isOpen = ref(false);

const handleLogOut = () => {
  localStorage.setItem("user", null);
  router.push("/login");
};
</script>

<template>
  <nav class="bg-white border-b border-gray-200 shadow-md w-full p-4">
    <div class="container mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-bold text-gray-800">
        Triply<span class="text-red-500 text-2xl italic">CO</span>
      </a>

      <div class="hidden md:flex space-x-4 items-center">
        <template v-if="user.fullName">
          <div class="relative">
            <button
              @click="isOpen = !isOpen"
              class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-200 transition"
            >
              <User class="w-6 h-6 text-gray-600" />
              <span>{{ user.fullName }}</span>
              <svg
                class="w-4 h-4 text-gray-600 transform transition-transform"
                :class="{ 'rotate-180': isOpen }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              v-if="isOpen"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-1"
            >
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <User class="w-4 h-4 mr-2" /> Profile
              </a>
              <button
                @click="handleLogOut"
                class="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center"
              >
                <LogOut class="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >Log In</router-link
          >
          <router-link
            to="/signup"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >Sign Up</router-link
          >
        </template>
      </div>

      <button class="md:hidden" @click="isOpen = !isOpen">
        <Menu v-if="!isOpen" size="24" />
        <X v-else size="24" />
      </button>
    </div>

    <div v-if="isOpen" class="md:hidden bg-white shadow-md border-t p-4">
      <ul class="flex flex-col space-y-4">
        <template v-if="user.fullName">
          <li>
            <span class="text-gray-800 font-semibold">{{ user.fullName }}</span>
          </li>
          <li>
            <a href="#" class="block hover:text-blue-500 flex items-center">
              <User class="w-4 h-4 mr-2" /> Profile
            </a>
          </li>
          <li>
            <button
              @click="handleLogOut"
              class="block text-red-500 hover:text-red-600 flex items-center"
            >
              <LogOut class="w-4 h-4 mr-2" /> Logout
            </button>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link
              to="/login"
              class="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >Log In</router-link
            >
          </li>
          <li>
            <router-link
              to="/signup"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >Sign Up</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
