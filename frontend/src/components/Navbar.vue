<script setup>
import { LogOut, Menu, User, X } from "lucide-vue-next";
import { ref } from "vue";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const { user } = useAuthStore();

const isMobileMenuOpen = ref(false);
const isDropdownOpen = ref(false);

const handleLogOut = () => {
  isDropdownOpen.value = false;
  isMobileMenuOpen.value = false;
  localStorage.setItem("user", null);
  router.push("/login");
};

// Close menu when clicking outside
const closeMenu = (event) => {
  if (event.target.id === "mobile-menu-overlay") {
    isMobileMenuOpen.value = false;
  }
};
</script>

<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm w-screen py-4">
    <div class="container mx-auto flex items-center justify-between px-6">
      <!-- Logo & Links -->
      <div class="flex items-center space-x-6">
        <router-link to="/" class="text-2xl font-bold text-gray-900">
          Triply<span class="text-red-500 italic">CO</span>
        </router-link>
        <router-link
          to="/"
          class="hidden md:block text-lg font-medium text-gray-700 hover:text-gray-900 transition"
        >
          Trips
        </router-link>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-4">
        <template v-if="user.fullName">
          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-200 transition"
            >
              <User class="w-6 h-6 text-gray-600" />
              <span>{{ user.fullName }}</span>
              <svg
                class="w-4 h-4 text-gray-600 transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }"
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

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-200 transform"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150 transform"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2"
            >
              <div
                v-if="isDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg p-2 border"
              >
                <router-link
                  to="/me"
                  @click="isDropdownOpen = false"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center rounded-lg"
                >
                  <User class="w-4 h-4 mr-2" /> Profile
                </router-link>
                <button
                  @click="handleLogOut"
                  class="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center rounded-lg"
                >
                  <LogOut class="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            </transition>
          </div>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >Log In</router-link
          >
          <router-link
            to="/signup"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >Sign Up</router-link
          >
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden focus:outline-none"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <Menu v-if="!isMobileMenuOpen" size="28" class="text-gray-800" />
        <X v-else size="28" class="text-gray-800" />
      </button>
    </div>

    <!-- Mobile Fullscreen Overlay Menu -->
    <transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu-overlay"
        class="fixed inset-0 bg-black/50 flex justify-center items-center"
        @click="closeMenu"
      >
        <div
          class="bg-white shadow-lg rounded-lg p-6 w-3/4 max-w-sm text-center"
        >
          <ul class="flex flex-col space-y-2">
            <template v-if="user.fullName">
              <li class="text-gray-900 text-xl underline font-bold">
                {{ user.fullName }}
              </li>
              <li>
                <router-link
                  to="/me"
                  @click="isMobileMenuOpen = false"
                  class="block text-left shadow text-lg font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 px-4 py-2 rounded-lg"
                >
                  <User class="w-5 h-5 inline-block mr-2" /> Profile
                </router-link>
              </li>
              <li>
                <button
                  @click="handleLogOut"
                  class="block text-lg shadow font-medium text-red-500 hover:text-red-600 hover:bg-gray-100 px-4 py-2 rounded-lg w-full text-left"
                >
                  <LogOut class="w-5 h-5 inline-block mr-2" /> Logout
                </button>
              </li>
            </template>
            <template v-else>
              <li>
                <router-link
                  @click="isMobileMenuOpen = false"
                  to="/login"
                  class="block text-lg font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 px-4 py-2 rounded-lg"
                >
                  Log In
                </router-link>
              </li>
              <li>
                <router-link
                  to="/signup"
                  @click="isMobileMenuOpen = false"
                  class="block text-lg font-medium bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Sign Up
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </transition>
  </nav>
</template>
