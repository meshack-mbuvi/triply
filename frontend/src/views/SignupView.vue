<script setup>
import AuthForm from "@/components/AuthForm.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const BASE_URL = import.meta.env.VITE_API_URL;
const router = useRouter();

const error = reactive({
  message: "",
  errors: [],
});

const handleSignup = async (userData) => {
  try {
    error.message = "";
    error.errors = [];

    const response = await fetch(`${BASE_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      error.message = errorResponse.message || "Signup failed";
      error.errors = Array.isArray(errorResponse.errors)
        ? errorResponse.errors
        : [];
      return;
    }

    router.push("/");
  } catch (err) {
    error.message = "Something went wrong. Please try again.";
    console.error("Signup error:", err);
  } finally {
    // Reset error after 4 seconds
    setTimeout(() => {
      error.message = "";
      error.errors = [];
    }, 4000);
  }
};
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-screen px-4">
    <div class="w-full max-w-md p-8 rounded-lg">
      <!-- Error Messages -->
      <div v-if="error.message" class="mb-4 text-red-500 text-center">
        {{ error.message }}
      </div>
      <ul
        v-if="error.errors.length"
        class="mb-4 text-red-500 text-sm list-disc pl-5"
      >
        <li v-for="(err, index) in error.errors" :key="index">{{ err }}</li>
      </ul>

      <!-- Signup Form -->
      <AuthForm
        title="Sign up"
        buttonText="Signup"
        :showName="true"
        @submit="handleSignup"
      />

      <!-- Redirect to Login -->
      <p class="text-center mt-4 text-gray-700">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>
