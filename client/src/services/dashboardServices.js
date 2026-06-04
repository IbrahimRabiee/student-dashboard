import { fetchingApi } from "./apiServices";

export const dashboardData = async (token) => {
  try {
    const data = await fetchingApi(token, "/dashboard", { method: "GET" });
    if (!data) {
      throw new Error("No data received from API");
    }

    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
