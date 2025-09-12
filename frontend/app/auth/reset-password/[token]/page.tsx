"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useResetPassword } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";

// ✅ Zod schema for reset password
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must not exceed 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useResetPassword(); // custom hook to call backend reset API

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // const onSubmit = async (data: ResetPasswordFormValues) => {
  //   setLoading(true);
  //   try {
  //     mutation.mutate(
  //       // { token, password: data.password },

  //       {
  //         onSuccess: (res) => {
  //           toast.success(res.message || "Password reset successful!");
  //           form.reset();
  //           setTimeout(() => router.push("/auth/signin"), 2000);
  //         },
  //         onError: (err) => {
  //           toast.error(err.message || "Failed to reset password");
  //         },
  //       }
  //     );
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       toast.error(error.message || "Something went wrong");
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);

    try {
      mutation.mutate(
        { token, password: data.password },

        {
          onSuccess: (res) => {
            toast.success(res.message || "Password reset link sent!");
            form.reset();
          },
          onError: (err: Error) => {
            toast.error(err.message || "Something went wrong");
          },
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          error.message || "Something went wrong while password resetting"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
    console.log("check data", data);
  };

  // const onSubmit = () => {};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg bg-white shadow-md dark:bg-zinc-900">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-1">Reset Password</h2>
          <p className="text-sm text-gray-500">Enter your new password below</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        disabled={loading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <FiEyeOff className="h-4 w-4" />
                        ) : (
                          <FiEye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        disabled={loading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="h-4 w-4" />
                        ) : (
                          <FiEye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

            <div className="text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => router.push("/auth/signin")}
                  className="p-0 h-auto font-bold cursor-pointer"
                >
                  Sign In
                </Button>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
