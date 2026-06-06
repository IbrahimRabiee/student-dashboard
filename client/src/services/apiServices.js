const BASE_URL = "http://localhost:5000/api";

export const fetchingApi = async (endpoint, options = {}, token) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // const data = await res.json();

  // to handle cases where the response body is empty or not valid JSON
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  // handling unauthorized access and token expiration
  if (res.status === 401) {
    throw new Error(data.message || "Unauthorized");
  }
  if (!res.ok) {
    throw new Error(data.message || "Request Failed");
  }
  return data;
};
