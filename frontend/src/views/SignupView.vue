<script setup>
import AuthForm from "@/components/AuthForm.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const { saveUser } = useAuthStore();

const router = useRouter();
const error = reactive({});

const handleSignup = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Convert JS object to JSON
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json(); // Get error details
      Object.assign(error, {
        message: errorResponse.message || "Signup failed",
        errors: errorResponse.errors,
      });
      throw new Error(errorResponse.message);
    }

    const data = await response.json(); // Parse JSON response
    saveUser(data.user);

    // Redirect to home after signup
    router.push("/");

    return data; // Return response data for further processing
  } catch (error) {
    console.log("Signup failed:", { error });
    Object.assign(error, { message: error.message });

    // Reset error
    setTimeout(() => {
      Object.assign(error, { message: "", errors: {} });
    }, 2000);
    return error;
  }
};
</script>

<template>
  <div
    class="flex items-center align-middle text-black justify-center h-screen bg-ray-500"
  >
    <div class="flex flex-col items-center justify-center w-1/2">
      <p v-if="error.message" class="text-red-500">{{ error.message }}</p>
      <div v-if="error.errors">
        <p v-for="error in error.errors" class="text-red-500">{{ error }}</p>
      </div>

      <AuthForm
        title="Sign up"
        buttonText="Signup"
        :showName="true"
        @submit="handleSignup"
        formData="formData"
      />
      <p class="text-center mt-4">
        Already have an account?
        <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
    </div>
  </div>
</template>
