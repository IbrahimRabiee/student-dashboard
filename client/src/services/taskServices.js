import { fetchingApi } from "./apiServices";

export const userTasks = async (token) => {
  return await fetchingApi("/tasks", { method: "GET" }, token);
};

export const createTask = async (token, title, description) => {
  return await fetchingApi(
    "/tasks",
    {
      method: "POST",
      body: JSON.stringify({ title, description }),
    },
    token,
  );
};

export const deleteTask = async (token, taskId) => {
  return await fetchingApi(
    `/tasks/${taskId}`,
    {
      method: "DELETE",
    },
    token,
  );
};

export const updateTask = async (token, taskId, title, description) => {
  return await fetchingApi(
    `/tasks/${taskId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ title, description }),
    },
    token,
  );
};
