import { fetchingApi } from "./apiServices";

export const dashboardData = async (token) => {
  return await fetchingApi("/dashboard", { method: "GET" }, token);
};
