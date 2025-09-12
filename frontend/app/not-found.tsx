"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Button onClick={() => router.back()} className="mt-6 cursor-pointer">
        Go Back
      </Button>
    </main>
  );
}
