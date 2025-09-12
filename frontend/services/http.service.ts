/**
 * The above TypeScript code defines an Axios instance with interceptors for handling token expiry and
 * setting authorization headers.
 */
import encryptDecrypt from "@/utils/encryptDecrypt";
import axios from "axios";
// { AxiosRequestConfig, AxiosResponse }

// Function to handle token expiry (customize this)
const handleTokenExpiry = () => {
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  localStorage.removeItem("client");
  window.location.href = "/login";
};

export const getToken = async (): Promise<string | null> => {
  const encryptedValue =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (!encryptedValue) return null;

  return encryptDecrypt.decrypt(encryptedValue as string);
};

// Axios instance
const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 200000,
});

AxiosInstance.interceptors.request.use(
  async function (config) {
    const token = await getToken();

    // console.log("check token here request interceptors", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  function (response) {
    console.log("check interceptors response here", response);

    return response;
  },
  function (error) {
    console.log("check error interceptors", error);
    // please not that if the error message is changed in backend it should be changed in front end
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message ===
        "Your token has expired. Please login again."
    ) {
      handleTokenExpiry(); // Call the custom function when token expires
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
