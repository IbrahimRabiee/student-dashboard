import { fetchingApi } from "./apiServices";

export const userTasks = async (token) => {
  try {
    const data = await fetchingApi(token, "/tasks", { method: "GET" });
    if (!data) {
      throw new Error("No data received from API");
    }

    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const createTask = async (token, title, description) => {
  try {
    const data = await fetchingApi(token, "/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });
    if (!data) {
      throw new Error("No data received from API");
    }

    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const deleteTask = async (token, taskId) => {
  try {
    const data = await fetchingApi(token, `/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!data) {
      throw new Error("No data received from API");
    }

    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const updateTask = async (token, taskId, title, description) => {
  try {
    const data = await fetchingApi(token, `/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, description }),
    });

    if (!data) {
      throw new Error("No data received from API");
    }

    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
