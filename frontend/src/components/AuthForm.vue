<template>
  <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">{{ title }}</h2>

    <form @submit.prevent="handleSubmit">
      <!-- Name Field (Only for Signup) -->
      <div v-if="showName" class="mb-4">
        <label class="block text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          v-model="formData.fullName"
          placeholder="Enter your full name"
          class="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
        />
        <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">
          {{ errors.fullName }}
        </p>
      </div>

      <!-- Email Field -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          v-model="formData.email"
          placeholder="Enter your email"
          class="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">
          {{ errors.email }}
        </p>
      </div>

      <!-- Password Field with Toggle -->
      <div class="mb-4 relative">
        <label class="block text-gray-700 mb-1">Password</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="formData.password"
            placeholder="Enter your password"
            class="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none pr-10"
          />
          <button
            type="button"
            class="absolute right-2 top-2 text-gray-500"
            @click="togglePasswordVisibility"
          >
            {{ showPassword ? "🙈" : "👁️" }}
          </button>
        </div>
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">
          {{ errors.password }}
        </p>
      </div>

      <!-- Submit Button with Loading State -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 flex justify-center items-center gap-2"
      >
        <span
          v-if="loading"
          class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"
        ></span>
        <span>{{ loading ? "Processing..." : buttonText }}</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";

const props = defineProps({
  title: String,
  buttonText: String,
  showName: Boolean, // Show name field only for signup
});

const emit = defineEmits(["submit"]);

const formData = ref({
  fullName: "",
  email: "",
  password: "",
});

const errors = ref({});
const showPassword = ref(false);
const loading = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
  errors.value = {};
  loading.value = true;

  if (props.showName && !formData.value.fullName) {
    errors.value.fullName = "Full name is required";
  }
  if (!formData.value.email || !/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = "Valid email is required";
  }
  if (!formData.value.password || formData.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors.value).length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
    emit("submit", formData.value);
  }

  loading.value = false;
};
</script>
