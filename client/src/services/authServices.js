import { fetchingApi } from "./apiServices";

export const loginUser = async (email, password) => {
  return await fetchingApi(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    null,
  );
};

export const registerUser = async (firstName, lastName, email, password) => {
  return await fetchingApi(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
    },
    null,
  );
};
