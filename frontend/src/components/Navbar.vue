<script setup>
import { LogOut, Menu, User, X } from "lucide-vue-next";
import { ref } from "vue";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();

const { user } = useAuthStore();
const isOpen = ref(false);
const handleLogOut = () => {
  // Just clear local storage for now
  localStorage.setItem("user", null);
  // redirect to login
  router.push("/login");
};
</script>

<template>
  <nav class="bg-gray-100 border-b border-gray-200 shadow-md w-full p-3">
    <div class="container mx-auto flex items-center justify-between py-4 px-6">
      <!-- Logo -->
      <a href="/" class="text-xl font-bold text-gray-800">
        Triply<span class="text-blue-500">X</span>
      </a>

      <!-- User Profile or Login Buttons -->
      <div class="hidden md:flex space-x-4">
        <template v-if="user.fullName">
          <div class="relative">
            <button
              @click="isOpen = !isOpen"
              class="flex text-lg focus:outline-none"
            >
              <User class="w-6 h-6 mr-2" /> {{ user.fullName }}
            </button>
            <div
              v-if="isOpen"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg"
            >
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <User class="w-4 h-4 mr-2" /> Profile
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center"
                @click="handleLogOut"
              >
                <LogOut class="w-4 h-4 mr-2" /> Logout
              </a>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link to="/login"
            ><button
              class="border cursor-pointer border-gray-300 px-4 py-2 rounded-lg"
            >
              Log In
            </button>
          </router-link>

          <router-link to="/signup"
            ><button
              class="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg"
            >
              Sign Up
            </button>
          </router-link>
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden" @click="isOpen = !isOpen">
        <Menu v-if="!isOpen" size="24" />
        <X v-else size="24" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white shadow-md border-t">
      <ul class="flex flex-col space-y-4 p-4 text-gray-700">
        <template v-if="user.fullName">
          <li class="mt-4 flex items-center space-x-2">
            <!-- <img :src="user.avatar" class="w-10 h-10 rounded-full" /> -->
            <span class="text-gray-800 font-semibold underline">{{
              user.fullName
            }}</span>
          </li>
          <li>
            <a href="#" class="block hover:text-blue-500 flex items-center">
              <User class="w-4 h-4 mr-2" /> Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block text-red-500 hover:text-red-600 flex items-center"
              @click="handleLogOut"
            >
              <LogOut class="w-4 h-4 mr-2" /> Logout
            </a>
          </li>
        </template>
        <template v-else>
          <li class="mt-4">
            <router-link to="/login"
              ><button
                class="border cursor-pointer border-gray-300 px-4 py-2 rounded-lg"
              >
                Log In
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/signup"
              ><button
                class="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </button>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
