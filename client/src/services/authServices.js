import { fetchingApi } from "./apiServices";

export const loginUser = async (email, password) => {
  try {
    const data = await fetchingApi(null, "/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // ✅ success
    console.log("User:", data);
    return data;
  } catch (error) {
    throw new Error(error.message || "An error occurred. Please try again.", {
      cause: error,
    });
  }
};
