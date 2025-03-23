<script setup>
import AuthForm from "@/components/AuthForm.vue";
import { useAuthStore } from "@/stores/authStore";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const { saveUser } = useAuthStore();
const router = useRouter();

const error = reactive({});

const handleLogin = async (userData) => {
  try {
    // Reset error before making a new request
    Object.assign(error, { message: "", errors: {} });

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      Object.assign(error, {
        message: errorResponse.message || "Login failed",
        errors: errorResponse.errors || {},
      });
      throw new Error(errorResponse.message);
    }

    const data = await response.json();
    saveUser(data);

    router.push("/");

    return data;
  } catch (err) {
    console.log("Login failed:", { err });
    Object.assign(error, { message: err.message });

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
        title="Login"
        buttonText="Login"
        :showName="false"
        @submit="handleLogin"
      />
      <p class="text-center mt-4">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>
