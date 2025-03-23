import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || {});

  const isAuthenticated = ref(false);

  const saveUser = (user) => {
    // ✅ Save user data in store
    // user.value = user;
    console.log({ user });
    localStorage.setItem("user", JSON.stringify(user));
    Object.assign(user, { ...user });
    isAuthenticated.value = true;
  };

  const login = async (credentials) => {
    try {
      console.log("Logging in user:", credentials);
      // Simulating API response
      if (
        credentials.email === "test@example.com" &&
        credentials.password === "password"
      ) {
        user.value = { email: credentials.email, name: "Test User" };
        isAuthenticated.value = true;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    saveUser,
  };
});
