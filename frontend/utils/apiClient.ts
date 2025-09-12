import { getToken } from "@/services/http.service";

export const apiClient = async (url: string, options: RequestInit = {}) => {
  const token = await getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  console.log("check token here", token);

  if (!response.ok) {
    console.log("check response here i am this is me", response);
    // Handle token expired globally
    if (
      response.status === 401 &&
      data.message?.toLowerCase().includes("token")
    ) {
      sessionStorage.removeItem("accessToken"); // clear token
      window.location.href = "/auth/signin"; // redirect to login
      return Promise.reject(new Error("Session expired. Logging out..."));
    }

    return Promise.reject(new Error(data.message || "Something went wrong"));
  }

  return data;
};
