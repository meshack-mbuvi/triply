<template>
  <div class="container flex">
    <div class="w-full mt-8 max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div class="flex items-center space-x-4">
        <img
          v-if="user.avatar"
          :src="user.avatar || defaultAvatar"
          alt="Profile Picture"
          class="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 class="text-xl font-semibold">{{ user.fullName }}</h2>
          <p class="text-gray-500">{{ user.email }}</p>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Bio</h3>
        <p class="text-gray-600">{{ user.bio || "No bio available." }}</p>
      </div>
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Joined</h3>
        <p class="text-gray-600">{{ formattedDate }}</p>
      </div>
      <button
        @click="showForm = true"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Edit Profile
      </button>
    </div>
  </div>

  <div
    v-if="showForm"
    class="fixed inset-0 bg-black/10 backdrop-invert backdrop-opacity-10 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
      <form @submit.prevent="saveProfile">
        <label class="block mb-2">Full Name</label>
        <input
          v-model="form.fullName"
          type="text"
          class="w-full border border-gray-300 p-2 rounded-lg mb-1"
        />
        <p v-if="errors.fullName" class="text-red-500 text-sm mb-4">
          {{ errors.fullName }}
        </p>

        <label class="block mb-2">Bio</label>
        <textarea
          v-model="form.bio"
          rows="3"
          class="w-full border border-gray-300 p-2 rounded-lg mb-1"
        ></textarea>
        <p v-if="errors.bio" class="text-red-500 text-sm mb-4">
          {{ errors.bio }}
        </p>

        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="showForm = false"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth.js";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const showForm = ref(false);
const form = ref({
  fullName: user.value.fullName,
  bio: user.value.bio,
  password: "",
});
const errors = ref({ fullName: "", password: "", bio: "" });

const formattedDate = computed(() => {
  return new Date(user.value.created_at).toLocaleDateString();
});

const validateForm = () => {
  errors.value.fullName = form.value.fullName.trim()
    ? ""
    : "Full name is required.";
  errors.value.bio =
    form.value.bio.trim().length >= 10 || !form.value.bio
      ? ""
      : "Bio must be at least 10 characters long.";

  return !errors.value.fullName && !errors.value.password && !errors.value.bio;
};

const saveProfile = async () => {
  if (!validateForm()) return;

  try {
    const response = await fetchWithAuth(`users/profile`, {
      method: "PATCH",
      body: JSON.stringify(form.value),
    });

    const updatedUser = response.user;
    updatedUser.token = user.value.token;

    authStore.getUserDetails();

    localStorage.setItem("user", JSON.stringify(updatedUser));
    router.push("/me");
    router.go();

  } catch (error) {
    console.log({ error });
  }

  showForm.value = false;
};
</script>
