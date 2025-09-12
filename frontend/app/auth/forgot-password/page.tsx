"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useForgotPassword } from "@/hooks/useAuth";

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

// ✅ Zod schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const mutation = useForgotPassword();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);

    try {
      mutation.mutate(data.email, {
        onSuccess: (res) => {
          toast.success(res.message || "Password reset link sent!");
          form.reset();
        },
        onError: (err: Error) => {
          toast.error(err.message || "Something went wrong");
        },
      });
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg bg-white shadow-md dark:bg-zinc-900">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-1">Forgot Password</h2>
          <p className="text-sm text-gray-500">
            Enter your email to receive a password reset link
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      disabled={loading}
                      {...field}
                    />
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
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <p className="text-sm">
                Remember your password?{" "}
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
