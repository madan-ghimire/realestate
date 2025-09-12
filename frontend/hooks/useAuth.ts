import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
}

// export function useResetPassword() {
//   return useMutation({
//     mutationFn: (data: { token: string; password: string }) =>
//       authService.resetPassword(data),
//   });
// }

// export function useResetPassword() {
//   return useMutation({mutationFn: (token, password)} =>
//   authService.resetPassword(token, password))
// }

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { token: string; password: string }) =>
      authService.resetPassword(data),
  });
}
