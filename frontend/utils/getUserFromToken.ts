// import { jwtDecode } from "jwt-decode";

// export interface DecodedToken {
//   id: string;
//   role: string;
//   username: string;
//   email: string;
//   iat: number;
//   exp: number;
// }

// export function getUserFromToken(): DecodedToken | null {
//   const token = sessionStorage.getItem("auth_token");

//   if (!token) return null;

//   try {
//     const decoded: DecodedToken = jwtDecode(token);
//     const isExpired = decoded.exp * 1000 < Date.now(); // convert to ms
//     return isExpired ? null : decoded;
//   } catch (error) {
//     console.error("Failed to decode JWT token:", error);
//     return null;
//   }
// }

import { jwtDecode } from "jwt-decode";
import encryptDecrypt from "@/utils/encryptDecrypt";

export interface DecodedToken {
  id: string;
  role: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Get user info from encrypted token stored in localStorage/sessionStorage
 */
export function getUserFromToken(): DecodedToken | null {
  const encryptedToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (!encryptedToken) return null;

  try {
    // Decrypt the token first
    const token = encryptDecrypt.decrypt(encryptedToken);
    if (!token) return null;

    // Decode JWT
    const decoded: DecodedToken = jwtDecode(token);

    // Check expiration
    const isExpired = decoded.exp * 1000 < Date.now();
    return isExpired ? null : decoded;
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
}
