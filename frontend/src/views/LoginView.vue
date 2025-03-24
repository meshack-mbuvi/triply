<script setup>
import AuthForm from "@/components/AuthForm.vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const BASE_URL = import.meta.env.VITE_API_URL;
const router = useRouter();

const error = reactive({
  message: "",
  errors: [],
});

onMounted(() => {
  // Redirect to home view if user is already logged in
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    router.push("/");
  }
});

const handleLogin = async (userData) => {
  try {
    error.message = "";
    error.errors = [];

    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      error.message = errorResponse.message || "Login failed";
      error.errors = Array.isArray(errorResponse.errors)
        ? errorResponse.errors
        : [];

      console.log({ error });

      return;
    }

    const data = await response.json();

    localStorage.setItem("user", JSON.stringify(data));
    router.push("/");
    router.go();
  } catch (err) {
    error.message = "Something went wrong. Please try again.";
    console.error("Login error:", err);
  } finally {
    // Reset error after 3 seconds
    setTimeout(() => {
      error.message = "";
      error.errors = [];
    }, 3000);
  }
};
</script>

<template>
  <div class="container flex items-center justify-center min-h-screen px-4">
    <div class="w-full max-w-md p-8 rounded-lg">
      <!-- Error Messages -->
      <div v-if="error.message" class="mb-4 text-red-500 text-center">
        {{ error.message }}
      </div>
      <ul
        v-if="error.errors.length > 0"
        class="mb-4 text-red-500 text-sm list-disc pl-5"
      >
        sds
        <li v-for="(err, index) in error.errors" :key="index">{{ err }}</li>
      </ul>

      <!-- Login Form -->
      <AuthForm
        title="Login"
        buttonText="Login"
        :showName="false"
        @submit="handleLogin"
      />

      <!-- Redirect to Signup -->
      <p class="text-center mt-4 text-gray-700">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500 hover:underline"
          >Sign Up</router-link
        >
      </p>
    </div>
  </div>
</template>
