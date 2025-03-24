import { useRouter } from "vue-router";
const BASE_URL = import.meta.env.VITE_API_URL;

// Get user token from localStorage
const getUserToken = () => {
  return JSON.parse(localStorage.getItem("user"))?.token || null;
};

// Fetch wrapper with authentication
export const fetchWithAuth = async (url, options = {}) => {
  const router = useRouter();
  const token = getUserToken();
  if (!token) {
    router.push("/login");
    throw new Error("User not authenticated");
  }

  const response = await fetch(`${BASE_URL}/api/${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("user");
    router.push("/login");
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Request failed");
  }

  return response.json();
};
