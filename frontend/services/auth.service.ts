import AxiosInstance from "@/services/http.service";
import { AuthResponse, SignInData, SignUpData } from "@/types/auth";
import { loginSuccess } from "@/utils/helper";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const response = await AxiosInstance.post("/auth/signup", data);

      console.log("check signup response here", response.data);

      // // For signup, only store token if auto-login is enabled
      // // This is typically for convenience, but user should still go through normal login flow
      // if (response.data.success && response.data.token) {
      //   // after successfully signup redirect to signin page
      //   redirect("/auth/signin");
      // }

      if (response.data.success) {
        loginSuccess(response.data.token?.token);
      }

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        throw new Error(
          (error.response?.data as { message?: string }).message ||
            "Sign up failed"
        );
      }
      throw new Error("Network error. Please try again.");
    }
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const response = await AxiosInstance.post("/auth/signin", data);

      console.log("check response here i am i2", response);

      if (response.data.success && response?.data?.response?.data?.token) {
        loginSuccess(response?.data?.response?.data?.token?.accessToken);
      }

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        throw new Error(
          (error.response.data as { message?: string }).message ||
            "Sign in failed"
        );
      }
      throw new Error("Network error. Please try again.");
    }
  },

  async forgotPassword(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await AxiosInstance.post("/auth/forgot-password", {
        email,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        throw new Error(
          (error.response?.data as { message?: string }).message ||
            "Failed to send reset link"
        );
      }

      throw new Error("Network error. Please try again.");
    }
  },

  async resetPassword(data: {
    token: string;
    password: string;
  }): Promise<{ success: boolean; message: string }> {
    const { token, password } = data;

    try {
      const response = await AxiosInstance.post(
        `/auth/reset-password/${token}`,
        { password }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        throw new Error(
          (error.response?.data as { message?: string }).message ||
            "Failed to send reset link"
        );
      }

      throw new Error("Network error. Please try again.");
    }
  },

  logout(): void {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    redirect("/auth/signin");
  },
};
