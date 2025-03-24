import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || {});

  async function getUserDetails() {
    try {
      const data = await fetchWithAuth("users/me");
      const { token } = JSON.parse(localStorage.getItem("user")) || {};

      const _user = {
        ...data.user,
        token,
      };

      Object.assign(user, _user);
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    user,
    getUserDetails,
  };
});
