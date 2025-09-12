"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

const LogoutPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = () => {
    authService.logout();
    router.push("/auth/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-semibold">Logout</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p className="text-sm">Are you sure you want to log out?</p>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center gap-2 px-6 py-2 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              Go Back
            </Button>

            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoutPage;
